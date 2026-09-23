import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface HrAnswer {
  answer: string;
  source: string | null;
  found: boolean;
  confidence?: number | string | null;
}

export const askHrQuestion = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        question: z
          .string()
          .trim()
          .min(1, "Please enter an HR policy question.")
          .max(1000, "Question must be less than 1000 characters."),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<HrAnswer> => {
    const webhookUrl = process.env["N8N_WEBHOOK_URL"];
    if (!webhookUrl) {
      throw new Error("HR backend is not configured yet.");
    }

    let response: Response;
    try {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: data.question }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      throw new Error("Unable to reach the HR Policy Assistant backend.");
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "The HR workflow isn't listening right now. In n8n, click \"Execute workflow\" and ask again, or activate the workflow and use its production URL.",
        );
      }
      throw new Error(`HR backend responded with status ${response.status}.`);
    }


    const raw = (await response.json().catch(() => null)) as {
      answer?: unknown;
      source?: unknown;
      found?: unknown;
      confidence?: unknown;
      match?: unknown;
    } | null;

    if (!raw || typeof raw.answer !== "string") {
      throw new Error("Unexpected response from the HR backend.");
    }

    return {
      answer: raw.answer,
      source: typeof raw.source === "string" ? raw.source : null,
      found: raw.found === true,
      confidence:
        typeof raw.confidence === "number" || typeof raw.confidence === "string"
          ? raw.confidence
          : typeof raw.match === "number" || typeof raw.match === "string"
            ? raw.match
            : null,
    };
  });
