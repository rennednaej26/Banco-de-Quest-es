"use client";

import { BarChart3, CheckCircle2, Clock, Target, XCircle } from "lucide-react";
import type { QuestionAttemptHistory } from "@/types/session";
import type { Question } from "@/types/study";

export function QuestionDashboard({ questions, history }: { questions: Question[]; history: QuestionAttemptHistory[] }) {
  const correct = history.filter((attempt) => attempt.isCorrect).length;
  const wrong = history.length - correct;
  const accuracy = history.length ? Math.round((correct / history.length) * 100) : 0;

  const bySubject = questions
    .map((question) => {
      const attempts = history.filter((attempt) => attempt.questionId === question.id);
      const hits = attempts.filter((attempt) => attempt.isCorrect).length;
      return {
        subject: question.subject,
        topic: question.topic,
        attempts: attempts.length,
        accuracy: attempts.length ? Math.round((hits / attempts.length) * 100) : 0
      };
    })
    .filter((item) => item.attempts > 0);

  const weak = [...bySubject].sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);
  const lastAttempts = [...history].reverse().slice(0, 8);

  return (
    <section className="rounded border border-[#d9dde2] bg-white">
      <div className="border-b border-[#d9dde2] bg-[#f7f8f9] px-5 py-4">
        <p className="text-sm font-medium text-[#55b5cb]">Dashboard</p>
        <h1 className="text-2xl font-semibold">Desempenho nas questoes</h1>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Target} label="Respondidas" value={history.length} />
        <Metric icon={CheckCircle2} label="Acertos" value={correct} />
        <Metric icon={XCircle} label="Erros" value={wrong} />
        <Metric icon={BarChart3} label="Aproveitamento" value={`${accuracy}%`} />
      </div>

      <div className="grid gap-5 p-5 pt-0 lg:grid-cols-[1fr_360px]">
        <section className="rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
          <h2 className="font-semibold">Temas respondidos</h2>
          {bySubject.length ? (
            <div className="mt-4 grid gap-3">
              {bySubject.map((item) => (
                <div key={`${item.subject}-${item.topic}`} className="rounded border border-[#d9dde2] bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.topic}</p>
                      <p className="text-sm text-[#607085]">{item.subject}</p>
                    </div>
                    <p className="text-lg font-bold text-[#278ad4]">{item.accuracy}%</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded bg-[#e7e9ec]">
                    <div className="h-full bg-[#55b5cb]" style={{ width: `${item.accuracy}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-[#607085]">{item.attempts} tentativa(s)</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#607085]">Responda algumas questoes para preencher este painel.</p>
          )}
        </section>

        <aside className="grid gap-5">
          <section className="rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
            <h2 className="font-semibold">Pontos fracos</h2>
            <div className="mt-3 grid gap-2">
              {weak.length ? (
                weak.map((item) => (
                  <div key={`${item.subject}-${item.topic}-weak`} className="rounded bg-white p-3 text-sm">
                    <p className="font-semibold">{item.topic}</p>
                    <p className="text-[#607085]">{item.accuracy}% de acerto</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#607085]">Sem dados suficientes ainda.</p>
              )}
            </div>
          </section>

          <section className="rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
            <h2 className="font-semibold">Ultimas respostas</h2>
            <div className="mt-3 grid gap-2">
              {lastAttempts.length ? (
                lastAttempts.map((attempt) => {
                  const question = questions.find((item) => item.id === attempt.questionId);
                  return (
                    <div key={attempt.id} className="rounded bg-white p-3 text-sm">
                      <p className={attempt.isCorrect ? "font-semibold text-[#137a2f]" : "font-semibold text-[#bd3030]"}>
                        {attempt.isCorrect ? "Acerto" : "Erro"} - {question?.topic ?? "Questao"}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#607085]">
                        <Clock size={13} /> {new Date(attempt.answeredAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-[#607085]">Nenhuma resposta registrada.</p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
      <Icon size={18} className="text-[#55b5cb]" />
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="text-sm text-[#607085]">{label}</p>
    </div>
  );
}
