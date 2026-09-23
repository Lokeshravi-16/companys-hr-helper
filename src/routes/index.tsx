import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  CalendarDays,
  Clock,
  FileQuestion,
  FileText,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Laptop,
  Loader2,
  LogOut,
  Mail,
  ScrollText,
  ShieldCheck,
  Timer,
  User,
  Wallet,
} from "lucide-react";
import { askHrQuestion, type HrAnswer } from "../lib/hr.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HR Policy Assistant — Your AI-powered HR policy companion" },
      {
        name: "description",
        content:
          "Ask questions about company HR policies and get clear, policy-based answers instantly. Internal employee support tool by TechNova Solutions.",
      },
      {
        property: "og:title",
        content: "HR Policy Assistant — Your AI-powered HR policy companion",
      },
      {
        property: "og:description",
        content:
          "Ask questions about company HR policies and get clear, policy-based answers instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SUGGESTIONS = [
  "How many annual leaves do I get?",
  "What is the notice period?",
  "Can I work from home?",
  "What are the working hours?",
];

const FAQS = [
  {
    category: "Leave & Time Off",
    question: "How many annual leaves do I get?",
    icon: CalendarDays,
  },
  { category: "Work From Home", question: "Can I work from home?", icon: Laptop },
  {
    category: "Notice Period",
    question: "What is the notice period?",
    icon: FileText,
  },
  {
    category: "Probation",
    question: "How long is the probation period?",
    icon: BadgeCheck,
  },
  {
    category: "Working Hours",
    question: "What are the standard working hours?",
    icon: Clock,
  },
  {
    category: "Salary",
    question: "When is salary normally credited?",
    icon: Wallet,
  },
];

const CATEGORIES = [
  {
    label: "Leave & Attendance",
    description: "Leave balances, holidays and attendance rules",
    icon: CalendarDays,
  },
  {
    label: "Working Hours",
    description: "Standard schedules, shifts and overtime",
    icon: Clock,
  },
  {
    label: "Work From Home",
    description: "Remote work eligibility and guidelines",
    icon: Laptop,
  },
  {
    label: "Payroll & Salary",
    description: "Pay cycles, credits and deductions",
    icon: Banknote,
  },
  {
    label: "Employee Benefits",
    description: "Insurance, allowances and perks",
    icon: HeartHandshake,
  },
  {
    label: "Probation",
    description: "Probation duration and confirmation",
    icon: BadgeCheck,
  },
  {
    label: "Resignation & Exit",
    description: "Notice, handover and exit formalities",
    icon: LogOut,
  },
  {
    label: "IT Security",
    description: "Device, access and data security rules",
    icon: ShieldCheck,
  },
  {
    label: "Code of Conduct",
    description: "Workplace behavior and ethics",
    icon: ScrollText,
  },
  {
    label: "Employee Training",
    description: "Learning programs and certifications",
    icon: GraduationCap,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Ask",
    text: "Ask your HR policy question.",
  },
  {
    number: "02",
    title: "Search",
    text: "The assistant finds relevant information from company policies.",
  },
  {
    number: "03",
    title: "Answer",
    text: "Receive a clear policy-based response.",
  },
];

const HR_MAILTO = "mailto:hr@technovasolutions.example";

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: HrAnswer }
  | { status: "not-found"; data: HrAnswer }
  | { status: "error" };

function Index() {
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>({ status: "idle" });
  const [lastQuestion, setLastQuestion] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loading = result.status === "loading";

  async function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) {
      setValidationError("Please enter an HR policy question.");
      inputRef.current?.focus();
      return;
    }
    setValidationError(null);
    setLastQuestion(trimmed);
    setResult({ status: "loading" });
    try {
      const data = await askHrQuestion({ data: { question: trimmed } });
      setResult(
        data.found
          ? { status: "success", data }
          : { status: "not-found", data },
      );
    } catch {
      setResult({ status: "error" });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Briefcase className="size-4.5" aria-hidden />
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[15px] font-semibold tracking-tight">
                HR Policy Assistant
              </span>
              <span className="hidden shrink-0 rounded-full border border-primary/20 bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground sm:inline-flex">
                AI Powered
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Main navigation"
            >
              <a
                href="#top"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                Home
              </a>
              <a
                href="#categories"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                HR Policies
              </a>
              <a
                href="#how-it-works"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                Help
              </a>
            </nav>
            <div
              className="grid size-9 place-items-center rounded-full border bg-muted"
              role="img"
              aria-label="User profile"
            >
              <User className="size-4 text-muted-foreground" aria-hidden />
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero + question area */}
        <section className="pb-12 pt-14 text-center sm:pt-20">
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Get answers to your HR policy questions instantly.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Ask a question and get a clear answer based on your company's HR
            policy documents.
          </p>

          <form
            className="mx-auto mt-10 max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              void submit(question);
            }}
          >
            <div className="rounded-3xl border bg-card p-3 text-left card-shadow-lg transition focus-within:border-primary/40 sm:p-4">
              <label
                htmlFor="hr-question"
                className="sr-only"
              >
                Your HR policy question
              </label>
              <textarea
                id="hr-question"
                ref={inputRef}
                rows={3}
                value={question}
                disabled={loading}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void submit(question);
                  }
                }}
                placeholder="Ask anything about company HR policies..."
                className="w-full resize-none rounded-2xl bg-transparent px-3 py-2 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70 disabled:opacity-60"
              />
              <div className="flex flex-col gap-3 px-1 pb-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Answers are grounded in company policy documents.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Thinking…
                    </>
                  ) : (
                    <>
                      Ask HR
                      <ArrowRight className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              </div>
            </div>

            {validationError ? (
              <p role="alert" className="mt-3 text-left text-sm font-medium text-destructive">
                {validationError}
              </p>
            ) : null}

            {/* Suggestion chips */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setQuestion(s);
                    setValidationError(null);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        </section>

        {/* Answer section */}
        {loading ? (
          <section className="mx-auto max-w-2xl pb-4" aria-live="polite">
            <div className="flex items-center justify-center gap-3 rounded-3xl border bg-card p-8 card-shadow">
              <Loader2 className="size-5 animate-spin text-primary" aria-hidden />
              <span className="text-sm font-medium text-muted-foreground">
                Thinking…
              </span>
            </div>
          </section>
        ) : null}

        {result.status === "success" ? (
          <section className="mx-auto max-w-2xl pb-4" aria-live="polite">
            <div className="rounded-3xl border bg-card p-6 text-left card-shadow-lg sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wide">
                    AI Answer
                  </h2>
                </div>
                {result.data.confidence != null &&
                result.data.confidence !== "" ? (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    Confidence / Match:{" "}
                    {typeof result.data.confidence === "number"
                      ? `${Math.round(
                          result.data.confidence <= 1
                            ? result.data.confidence * 100
                            : result.data.confidence,
                        )}%`
                      : result.data.confidence}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
                {result.data.answer}
              </p>
              {result.data.source ? (
                <div className="mt-6 border-t pt-5">
                  <div className="flex items-center gap-2">
                    <FileText
                      className="size-4 text-muted-foreground"
                      aria-hidden
                    />
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Policy Source
                    </span>
                    <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {result.data.source}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {result.status === "not-found" ? (
          <section className="mx-auto max-w-2xl pb-4" aria-live="polite">
            <div className="rounded-3xl border bg-card p-6 text-center card-shadow-lg sm:p-8">
              <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <Info className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-bold tracking-tight">
                Information not found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                This information was not found in the available HR policy
                documents. Please contact HR for clarification.
              </p>
              <a
                href={HR_MAILTO}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Mail className="size-4" aria-hidden />
                Contact HR
              </a>
            </div>
          </section>
        ) : null}

        {result.status === "error" ? (
          <section className="mx-auto max-w-2xl pb-4" aria-live="polite">
            <div className="rounded-3xl border border-destructive/30 bg-card p-6 text-center card-shadow-lg sm:p-8">
              <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-destructive/10 text-destructive">
                <FileQuestion className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-bold tracking-tight">
                Something went wrong
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Unable to connect to HR Assistant.
              </p>
              <button
                type="button"
                onClick={() => void submit(lastQuestion || question)}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring"
              >
                Try Again
              </button>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section className="py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Click a question to ask it instantly.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FAQS.map(({ category, question: q, icon: Icon }) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuestion(q);
                  setValidationError(null);
                  void submit(q);
                }}
                disabled={loading}
                className="group rounded-2xl border bg-card p-5 text-left card-shadow transition hover:-translate-y-0.5 hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-primary" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {category}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  “{q}”
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="scroll-mt-20 py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Explore HR Policies
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            The policy areas covered by the assistant.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CATEGORIES.map(({ label, description, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border bg-card p-5 card-shadow transition hover:-translate-y-0.5 hover:border-primary/30"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-3 text-sm font-semibold leading-tight">
                  {label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How It Works
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
            {STEPS.map(({ number, title, text }) => (
              <div key={number} className="text-center md:text-left">
                <span className="text-sm font-bold tracking-widest text-primary">
                  {number}
                </span>
                <h3 className="mt-2 text-base font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust / disclaimer */}
        <section className="pb-16 pt-4">
          <div className="rounded-3xl border border-primary/15 bg-accent/40 p-6 card-shadow sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-4" aria-hidden />
              </span>
              <h3 className="text-base font-bold">
                Answers grounded in company policies
              </h3>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/85">
              The HR Policy Assistant uses available company HR policy documents
              to provide answers. When the required information isn't available,
              it directs employees to HR instead of making assumptions.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Home className="size-3.5" aria-hidden />
              For official clarification, please contact the HR department.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-sm font-bold">HR Policy Assistant</span>
              <p className="mt-1 text-xs text-muted-foreground">
                Internal HR support tool
              </p>
            </div>
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground"
              aria-label="Footer navigation"
            >
              <a
                href="#categories"
                className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                HR Policies
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                Help
              </a>
              <a
                href={HR_MAILTO}
                className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                Contact HR
              </a>
            </nav>
          </div>
          <p className="mt-8 border-t pt-6 text-xs text-muted-foreground">
            © 2026 TechNova Solutions Pvt. Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
