"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Difficulty, Question } from "@/types/study";

const emptyQuestion = {
  subject: "",
  topic: "",
  subtopic: "",
  board: "",
  role: "",
  year: new Date().getFullYear(),
  difficulty: "media" as Difficulty,
  statement: "",
  explanation: "",
  tags: ""
};

export function QuestionCreator({ onSave }: { onSave: (question: Question) => void }) {
  const [kind, setKind] = useState<"multiple" | "boolean">("multiple");
  const [form, setForm] = useState(emptyQuestion);
  const [alternatives, setAlternatives] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(0);

  const finalAlternatives = kind === "boolean" ? ["Certo", "Errado"] : alternatives;

  function save() {
    const cleanAlternatives = finalAlternatives.map((item) => item.trim()).filter(Boolean);
    if (!form.statement.trim() || cleanAlternatives.length < 2) return;
    onSave({
      id: `q-${Date.now()}`,
      subject: form.subject || "Sem materia",
      topic: form.topic || "Sem tema",
      subtopic: form.subtopic || "Sem subtema",
      board: form.board || "Banca nao informada",
      role: form.role || "Cargo nao informado",
      year: Number(form.year) || new Date().getFullYear(),
      difficulty: form.difficulty,
      statement: form.statement,
      alternatives: cleanAlternatives,
      answerIndex,
      explanation: form.explanation || "Comentario ainda nao informado.",
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      stats: { attempts: 0, accuracy: 0, avgTimeSeconds: 90 }
    });
    setForm(emptyQuestion);
    setAlternatives(["", "", "", ""]);
    setAnswerIndex(0);
  }

  return (
    <section className="rounded border border-[#d9dde2] bg-white">
      <div className="border-b border-[#d9dde2] bg-[#f7f8f9] px-5 py-4">
        <p className="text-sm font-medium text-[#55b5cb]">Cadastro</p>
        <h1 className="text-2xl font-semibold">Adicionar questao</h1>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          <div className="flex gap-2">
            <button onClick={() => { setKind("multiple"); setAnswerIndex(0); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${kind === "multiple" ? "bg-[#20b8d2] text-white" : "bg-[#eef0f2]"}`}>Multipla escolha</button>
            <button onClick={() => { setKind("boolean"); setAnswerIndex(0); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${kind === "boolean" ? "bg-[#20b8d2] text-white" : "bg-[#eef0f2]"}`}>Certo e errado</button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Input label="Materia" value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} />
            <Input label="Tema" value={form.topic} onChange={(value) => setForm({ ...form, topic: value })} />
            <Input label="Subtema" value={form.subtopic} onChange={(value) => setForm({ ...form, subtopic: value })} />
            <Input label="Banca" value={form.board} onChange={(value) => setForm({ ...form, board: value })} />
            <Input label="Cargo" value={form.role} onChange={(value) => setForm({ ...form, role: value })} />
            <Input label="Ano" value={String(form.year)} onChange={(value) => setForm({ ...form, year: Number(value) })} />
          </div>

          <label className="grid gap-2 text-sm font-semibold">Dificuldade
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })} className="rounded border border-[#d9dde2] p-3">
              <option value="facil">Facil</option><option value="media">Media</option><option value="dificil">Dificil</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold">Enunciado
            <textarea value={form.statement} onChange={(e) => setForm({ ...form, statement: e.target.value })} className="min-h-44 rounded border border-[#d9dde2] p-3" placeholder="Cole a questao aqui. Cada linha em branco vira um paragrafo." />
          </label>

          <div className="grid gap-3">
            <div className="flex items-center justify-between"><h2 className="font-semibold">Alternativas</h2>{kind === "multiple" && <button onClick={() => setAlternatives((items) => [...items, ""])} className="inline-flex items-center gap-2 rounded border border-[#d9dde2] px-3 py-2 text-sm"><Plus size={15} /> Adicionar</button>}</div>
            {finalAlternatives.map((alt, index) => (
              <div key={index} className="flex items-center gap-3 rounded border border-[#d9dde2] bg-[#fbfbfc] p-2">
                <input type="radio" checked={answerIndex === index} onChange={() => setAnswerIndex(index)} />
                <span className="font-semibold">{String.fromCharCode(65 + index)}</span>
                {kind === "multiple" ? <input value={alternatives[index] ?? ""} onChange={(e) => setAlternatives((items) => items.map((item, i) => i === index ? e.target.value : item))} className="flex-1 rounded border border-[#d9dde2] p-2" /> : <span>{alt}</span>}
                {kind === "multiple" && alternatives.length > 2 && <button onClick={() => setAlternatives((items) => items.filter((_, i) => i !== index))} className="rounded border border-[#d9dde2] p-2"><Trash2 size={15} /></button>}
              </div>
            ))}
          </div>

          <label className="grid gap-2 text-sm font-semibold">Resposta detalhada / comentario
            <textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} className="min-h-36 rounded border border-[#d9dde2] p-3" placeholder="Explique o gabarito. Isso aparece depois que a questao for respondida." />
          </label>
          <Input label="Tags separadas por virgula" value={form.tags} onChange={(value) => setForm({ ...form, tags: value })} />
          <button onClick={save} className="inline-flex items-center justify-center gap-2 rounded bg-[#6fdda0] px-5 py-3 font-bold text-[#06110c]"><Save size={18} /> Salvar questao</button>
        </div>

        <aside className="rounded border border-[#d9dde2] bg-[#fbfbfc] p-4">
          <h2 className="font-semibold">Previa</h2>
          <div className="mt-4 grid gap-4 text-sm leading-7">
            {form.statement.split(/\n+/).filter(Boolean).map((p, index) => <p key={index}>{p}</p>)}
          </div>
          <div className="mt-4 grid overflow-hidden rounded border border-[#d9dde2]">
            {finalAlternatives.map((alt, index) => <p key={index} className="border-b border-[#d9dde2] bg-white px-3 py-2 last:border-b-0"><b>{String.fromCharCode(65 + index)}</b> {alt || "Alternativa"}</p>)}
          </div>
          <p className="mt-4 text-sm text-[#607085]">Gabarito: {String.fromCharCode(65 + answerIndex)}</p>
        </aside>
      </div>
    </section>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input value={value} onChange={(e) => onChange(e.target.value)} className="rounded border border-[#d9dde2] p-3" /></label>;
}
