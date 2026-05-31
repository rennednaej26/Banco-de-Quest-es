"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Filter, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import type { QuestionAttemptHistory } from "@/types/session";
import type { Question } from "@/types/study";

export function TecStudyApp({ questions, history, onAttempt }: { questions: Question[]; history: QuestionAttemptHistory[]; onAttempt: (attempt: QuestionAttemptHistory) => void }) {
  const [keyword, setKeyword] = useState("");
  const [subject, setSubject] = useState("Todas");
  const [topic, setTopic] = useState("Todos");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const subjects = unique(questions.map((q) => q.subject));
  const topics = unique(questions.map((q) => q.topic));

  const filtered = useMemo(() => {
    const text = keyword.toLowerCase();
    return questions.filter((q) => {
      const matchesText = !text || [q.statement, q.subject, q.topic, q.board, q.role, q.tags.join(" ")].join(" ").toLowerCase().includes(text);
      return matchesText && (subject === "Todas" || q.subject === subject) && (topic === "Todos" || q.topic === topic);
    });
  }, [questions, keyword, subject, topic]);

  const question = filtered[current] ?? filtered[0];
  const correct = history.filter((item) => item.isCorrect).length;
  const wrong = history.length - correct;
  const questionHistory = question ? history.filter((item) => item.questionId === question.id).reverse() : [];

  function resetAnswer(nextIndex = current) {
    setCurrent(Math.max(0, Math.min(nextIndex, filtered.length - 1)));
    setSelected(null);
    setAnswered(false);
    setShowExplanation(false);
  }

  function answer() {
    if (!question || selected === null) return;
    setAnswered(true);
    onAttempt({
      id: `${question.id}-${Date.now()}`,
      questionId: question.id,
      selectedIndex: selected,
      correctIndex: question.answerIndex,
      isCorrect: selected === question.answerIndex,
      answeredAt: new Date().toISOString()
    });
  }

  return (
    <div className="grid gap-5">
      <section className="rounded border border-[#d9dde2] bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-[#e5f7fb] px-4 py-2 text-sm font-semibold text-[#278ad4]"><Filter size={16} /> Filtros</div>
          <input value={keyword} onChange={(e) => { setKeyword(e.target.value); resetAnswer(0); }} placeholder="Palavra chave" className="min-w-[220px] flex-1 rounded border border-[#d9dde2] px-3 py-2" />
          <select value={subject} onChange={(e) => { setSubject(e.target.value); resetAnswer(0); }} className="rounded border border-[#d9dde2] px-3 py-2"><option>Todas</option>{subjects.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={topic} onChange={(e) => { setTopic(e.target.value); resetAnswer(0); }} className="rounded border border-[#d9dde2] px-3 py-2"><option>Todos</option>{topics.map((item) => <option key={item}>{item}</option>)}</select>
          <button onClick={() => resetAnswer(0)} className="rounded bg-[#efbd8d] px-5 py-2 font-semibold text-[#111827]">Filtrar</button>
        </div>
      </section>

      <section className="rounded border border-[#d9dde2] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9dde2] bg-[#f7f8f9] px-5 py-4">
          <div>
            <h1 className="text-xl font-semibold">Questao {filtered.length ? current + 1 : 0} de {filtered.length}</h1>
            <p className="text-sm text-[#607085]">{question?.subject} - {question?.topic}</p>
          </div>
          <div className="flex gap-2 text-sm font-semibold">
            <span className="rounded-full bg-[#ddf7e4] px-3 py-1 text-[#137a2f]">{correct} acertos</span>
            <span className="rounded-full bg-[#fde7e7] px-3 py-1 text-[#bd3030]">{wrong} erros</span>
            <span className="rounded-full bg-[#e7f3fb] px-3 py-1 text-[#278ad4]">{history.length} resolvidas</span>
          </div>
        </div>

        {question ? (
          <div className="p-5">
            <div className="mb-4 text-sm font-bold text-[#278ad4]">#{question.id} {question.board} - {question.year} - {question.role}</div>
            <RichText text={question.statement} />
            <div className="mt-5 grid overflow-hidden rounded border border-[#d9dde2]">
              {question.alternatives.map((alt, index) => {
                const isSelected = selected === index;
                const isCorrect = answered && index === question.answerIndex;
                const isWrong = answered && isSelected && index !== question.answerIndex;
                return (
                  <button key={alt} onClick={() => !answered && setSelected(index)} className={`flex gap-3 border-b border-[#d9dde2] px-3 py-2 text-left last:border-b-0 ${isCorrect ? "bg-[#ddf7e4]" : isWrong ? "bg-[#fde7e7]" : isSelected ? "bg-[#e7f3fb]" : "bg-[#fbfbfc]"}`}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#cfd5dc] text-xs font-semibold">{String.fromCharCode(65 + index)}</span>
                    <span>{alt}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button onClick={answer} disabled={selected === null || answered} className="rounded bg-[#6fdda0] px-5 py-3 text-sm font-bold text-[#06110c] disabled:opacity-50">RESOLVER QUESTAO</button>
              {answered && <button onClick={() => setShowExplanation((v) => !v)} className="rounded border border-[#d9dde2] px-4 py-3 text-sm font-semibold">Resposta detalhada</button>}
              <button onClick={() => resetAnswer()} className="rounded border border-[#d9dde2] p-3"><RotateCcw size={18} /></button>
              <button onClick={() => resetAnswer(current - 1)} className="rounded border border-[#d9dde2] p-3"><ChevronLeft size={18} /></button>
              <button onClick={() => resetAnswer(current + 1)} className="rounded border border-[#d9dde2] p-3"><ChevronRight size={18} /></button>
            </div>

            {answered && <Result ok={selected === question.answerIndex} />}
            {answered && showExplanation && <div className="mt-4 rounded border border-[#d9dde2] bg-[#fbfbfc] p-4"><h2 className="font-semibold">Comentario da questao</h2><RichText text={question.explanation} /></div>}

            <label className="mt-5 block text-sm font-semibold">Minhas anotacoes</label>
            <textarea value={notes[question.id] ?? ""} onChange={(e) => setNotes((all) => ({ ...all, [question.id]: e.target.value }))} className="mt-2 min-h-24 w-full rounded border border-[#d9dde2] p-3" placeholder="Escreva seu comentario pessoal sobre esta questao" />

            <div className="mt-5 rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
              <h2 className="font-semibold">Historico desta questao</h2>
              {questionHistory.length ? questionHistory.map((item) => <p key={item.id} className="mt-2 text-sm text-[#607085]">{new Date(item.answeredAt).toLocaleString("pt-BR")} - marcou {letter(item.selectedIndex)} - gabarito {letter(item.correctIndex)} - {item.isCorrect ? "acertou" : "errou"}</p>) : <p className="mt-2 text-sm text-[#607085]">Nenhuma resposta ainda.</p>}
            </div>
          </div>
        ) : <p className="p-5 text-sm text-[#607085]">Nenhuma questao encontrada.</p>}
      </section>
    </div>
  );
}

function Result({ ok }: { ok: boolean }) {
  return <div className={`mt-4 flex items-center gap-2 rounded p-3 font-semibold ${ok ? "bg-[#ddf7e4] text-[#137a2f]" : "bg-[#fde7e7] text-[#bd3030]"}`}>{ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}{ok ? "Voce acertou." : "Voce errou."}</div>;
}

function RichText({ text }: { text: string }) {
  return <div className="grid gap-4 leading-8 text-[#182336]">{text.split(/\n+/).filter(Boolean).map((p, index) => <p key={index}>{p}</p>)}</div>;
}

function unique(values: string[]) { return Array.from(new Set(values)).filter(Boolean).sort(); }
function letter(index: number) { return String.fromCharCode(65 + index); }
