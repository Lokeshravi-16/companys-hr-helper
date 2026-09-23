import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Briefcase,
  CalendarDays,
  Clock,
  FileQuestion,
  GraduationCap,
  HeartHandshake,
  Home,
  Laptop,
  Loader2,
  LogOut,
  Mail,
  MessageSquareText,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  User,
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

const FAQS = [
  { category: "Leave & Time Off", question: "How many annual leaves do I get?" },
  { category: "Work From Home", question: "Can I work from home?" },
  { category: "Notice Period", question: "What is the notice period?" },
  { category: "Probation", question: "How long is the probation period?" },
  { category: "Working Hours", question: "What are the standard working hours?" },
  { category: "Salary", question: "When is salary normally credited?" },
];

const CATEGORIES = [
  { label: "Leave & Attendance", icon: CalendarDays },
  { label: "Working Hours", icon: Clock },
  { label: "Work From Home", icon: Laptop },
  { label: "Payroll & Salary", icon: Banknote },
  { label: "Benefits", icon: HeartHandshake },
  { label: "Probation", icon: BadgeCheck },
  { label: "Resignation & Exit", icon: LogOut },
  { label: "IT Security", icon: ShieldCheck },
  { label: "Code of Conduct", icon: ScrollText },
  { label: "Employee Training", icon: GraduationCap },
];

const STEPS = [
  {
    icon: MessageSquareText,
    title: "1. Ask",
    text: "Enter your HR policy question.",
  },
  {
    icon: Search,
    title: "2. Search",
    text: "The system searches the company's available HR policy information.",
  },
  {
    icon: Sparkles,
    title: "3. Answer",
    text: "The AI provides a concise answer based on the available policy information.",
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

  const loading = result.status === "loading";

  async function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) {
      setValidationError("Please enter an HR policy question.");
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

  function pickQuestion(q: string) {
    setQuestion(q);
    setValidationError(null);
    void submit(q);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Briefcase className="size-4.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold tracking-tight">
                HR Policy Assistant
              </span>
              <span className="hidden rounded-full border border-primary/20 bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground sm:inline-flex">
                AI Powered
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="#top"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Home
            </a>
            <a
              href="#categories"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              HR Policies
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Help
            </a>
          </nav>
          <div
            className="grid size-9 place-items-center rounded-full border bg-muted"
            aria-label="User profile"
          >
            <User className="size-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section className="pb-10 pt-14 text-center sm:pt-20">
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Get answers to your HR policy questions instantly.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Ask a question and get a clear answer based on your company's HR
            policy documents.
          </p>

          {/* Question form */}
          <form
            className="mx-auto mt-10 max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              void submit(question);
            }}
          >
            <div className="rounded-3xl border bg-card p-3 card-shadow-lg sm:p-4">
              <label htmlFor="hr-question" className="sr-only">
                Question
              </label>
              <textarea
                id="hr-question"
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
                  Example: How many annual leaves do I get?
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    "Ask HR"
                  )}
                </button>
              </div>
            </div>
            {validationError ? (
              <p className="mt-3 text-sm font-medium text-destructive">
                {validationError}
              </p>
            ) : null}
          </form>
        </section>

        {/* Answer section */}
        {result.status !== "idle" && result.status !== "loading" ? (
          <section className="mx-auto max-w-2xl pb-4">
            {result.status === "success" ? (
              <div className="rounded-3xl border bg-card p-6 card-shadow-lg sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Sparkles className="size-4" />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wide">
                    AI Answer
                  </h2>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
                  {result.data.answer}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5">
                  {result.data.source ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Policy Source
                      </span>
                      <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                        {result.data.source}
                      </span>
                    </div>
                  ) : null}
                  {result.data.confidence != null &&
                  result.data.confidence !== "" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Confidence / Match
                      </span>
                      <span className="rounded-lg bg-success px-2.5 py-1 text-xs font-bold text-success-foreground">
                        {typeof result.data.confidence === "number"
                          ? `${Math.round(
                              result.data.confidence <= 1
                                ? result.data.confidence * 100
                                : result.data.confidence,
                            )}%`
                          : result.data.confidence}
                      </span>
                    </div>
                  ) : null}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Question: “{lastQuestion}”
                </p>
              </div>
            ) : null}

            {result.status === "not-found" ? (
              <div className="rounded-3xl border bg-card p-6 text-center card-shadow-lg sm:p-8">
                <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-muted text-muted-foreground">
                  <FileQuestion className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold tracking-tight">
                  I couldn't find that information.
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  This information was not found in the available HR policy
                  documents. Please contact HR for clarification.
                </p>
                <a
                  href={HR_MAILTO}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <Mail className="size-4" />
                  Contact HR
                </a>
              </div>
            ) : null}

            {result.status === "error" ? (
              <div className="rounded-3xl border border-destructive/30 bg-card p-6 text-center card-shadow-lg sm:p-8">
                <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-destructive/10 text-destructive">
                  <TriangleAlert className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold tracking-tight">
                  Something went wrong
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Unable to connect to the HR Policy Assistant right now. Please
                  try again later or contact HR.
                </p>
                <button
                  type="button"
                  onClick={() => void submit(lastQuestion || question)}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            ) : null}
          </section>
        ) : null}

        {loading ? (
          <section className="mx-auto max-w-2xl pb-4">
            <div className="flex items-center justify-center gap-3 rounded-3xl border bg-card p-8 card-shadow">
              <Loader2 className="size-5 animate-spin text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Searching
              </span>
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
            {FAQS.map((faq) => (
              <button
                key={faq.question}
                type="button"
                onClick={() => pickQuestion(faq.question)}
                disabled={loading}
                className="group rounded-2xl border bg-card p-5 text-left card-shadow transition hover:-translate-y-0.5 hover:border-primary/30 hover:card-shadow-lg disabled:opacity-60"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {faq.category}
                </span>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  “{faq.question}”
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            HR Policy Categories
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            The areas covered by the assistant.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border bg-card p-5 text-center card-shadow transition hover:-translate-y-0.5 hover:card-shadow-lg"
              >
                <span className="mx-auto grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-[13px] font-semibold leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How It Works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border bg-card p-6 card-shadow"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
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
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="size-4" />
              </span>
              <h3 className="text-base font-bold">Policy-based answers</h3>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/85">
              HR Policy Assistant answers questions using the company's
              available HR policy documents. If the required information is not
              available, the assistant will direct employees to HR instead of
              making assumptions.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Home className="size-3.5" />
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
                Internal employee support tool
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
              <a href="#categories" className="transition-colors hover:text-foreground">
                HR Policies
              </a>
              <a href="#how-it-works" className="transition-colors hover:text-foreground">
                Help
              </a>
              <a href={HR_MAILTO} className="transition-colors hover:text-foreground">
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
