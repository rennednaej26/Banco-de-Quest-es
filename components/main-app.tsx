"use client";

import { BarChart3, FileQuestion, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { QuestionCreator } from "@/components/question-creator";
import { QuestionDashboard } from "@/components/question-dashboard";
import { TecStudyApp } from "@/components/tec-study-app";
import { questions } from "@/lib/sample-data";
import type { QuestionAttemptHistory } from "@/types/session";
import type { Question } from "@/types/study";

export function MainApp() {
  const [questionBank, setQuestionBank] = useState<Question[]>(questions);
  const [mode, setMode] = useState<"study" | "create" | "dashboard">("study");
  const [history, setHistory] = useState<QuestionAttemptHistory[]>([]);

  return (
    <main className="dark-study min-h-screen bg-[#080b12] text-[#e8edf7]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d111b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#20b8d2] text-white shadow-[0_0_28px_rgba(32,184,210,.35)]">
              <FileQuestion size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Banco AI</p>
              <p className="text-xs text-[#8e9bb0]">Responder questoes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("study")}
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold sm:flex ${
                mode === "study" ? "bg-[#20b8d2] text-white" : "bg-white/8 text-[#b5c0d4] hover:bg-white/12"
              }`}
            >
              <Sparkles size={16} /> Responder
            </button>
            <button
              onClick={() => setMode("create")}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                mode === "create" ? "bg-[#20b8d2] text-white" : "bg-white/8 text-[#b5c0d4] hover:bg-white/12"
              }`}
            >
              <Plus size={16} /> Adicionar questao
            </button>
            <button
              onClick={() => setMode("dashboard")}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                mode === "dashboard" ? "bg-[#20b8d2] text-white" : "bg-white/8 text-[#b5c0d4] hover:bg-white/12"
              }`}
            >
              <BarChart3 size={16} /> Dashboard
            </button>
          </div>
        </div>
      </header>

      <section className="px-4 py-5 sm:px-8">
        <div className="mx-auto max-w-[1140px]">
          {mode === "study" ? (
            <TecStudyApp
              questions={questionBank}
              history={history}
              onAttempt={(attempt) => setHistory((current) => [...current, attempt])}
            />
          ) : mode === "create" ? (
            <QuestionCreator
              onSave={(question) => {
                setQuestionBank((current) => [question, ...current]);
                setMode("study");
              }}
            />
          ) : (
            <QuestionDashboard questions={questionBank} history={history} />
          )}
        </div>
      </section>
    </main>
  );
}
