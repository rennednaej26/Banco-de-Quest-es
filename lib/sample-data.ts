import type { Flashcard, Question, ReviewState } from "@/types/study";
import { initialReviewState } from "@/lib/sm2";

export const questions: Question[] = [
  {
    id: "q-001",
    subject: "Direito Administrativo",
    topic: "Atos Administrativos",
    subtopic: "Anulacao e revogacao",
    board: "CESPE",
    role: "Analista Judiciario",
    year: 2024,
    difficulty: "media",
    statement: "A administracao publica pode revogar seus proprios atos por motivo de conveniencia e oportunidade, respeitados os direitos adquiridos.",
    alternatives: ["Certo", "Errado"],
    answerIndex: 0,
    explanation: "A revogacao incide sobre ato legal e discricionario por razoes de merito administrativo, preservando direitos adquiridos.",
    tags: ["lei-9784", "atos", "merito"],
    stats: { attempts: 8421, accuracy: 58, avgTimeSeconds: 72 }
  },
  {
    id: "q-002",
    subject: "Direito Constitucional",
    topic: "Organizacao do Estado",
    subtopic: "Competencias legislativas",
    board: "FGV",
    role: "Auditor",
    year: 2023,
    difficulty: "dificil",
    statement: "Compete privativamente a Uniao legislar sobre diretrizes e bases da educacao nacional.",
    alternatives: [
      "A competencia e comum da Uniao, dos Estados e dos Municipios.",
      "A competencia e privativa da Uniao.",
      "A competencia e exclusiva dos Estados.",
      "A competencia e suplementar dos Municipios.",
      "A competencia depende de lei complementar estadual."
    ],
    answerIndex: 1,
    explanation: "O art. 22, XXIV, da Constituicao atribui privativamente a Uniao legislar sobre diretrizes e bases da educacao nacional.",
    tags: ["cf88", "art-22", "competencias"],
    stats: { attempts: 6310, accuracy: 41, avgTimeSeconds: 96 }
  },
  {
    id: "q-003",
    subject: "Portugues",
    topic: "Sintaxe",
    subtopic: "Concordancia verbal",
    board: "FCC",
    role: "Tecnico Administrativo",
    year: 2022,
    difficulty: "facil",
    statement: "Assinale a alternativa em que a concordancia verbal esta correta.",
    alternatives: [
      "Fazem dez anos que o edital foi publicado.",
      "Houveram muitos recursos contra o gabarito.",
      "Existem motivos suficientes para a revisao.",
      "Tratam-se de questoes complexas.",
      "Precisa-se de servidores qualificados."
    ],
    answerIndex: 2,
    explanation: "O verbo existir e pessoal e concorda com o sujeito plural: existem motivos. Em 'precisa-se', o verbo fica no singular por indice de indeterminacao do sujeito.",
    tags: ["concordancia", "fcc", "verbo"],
    stats: { attempts: 11208, accuracy: 67, avgTimeSeconds: 64 }
  }
];

export const flashcards: Flashcard[] = [
  {
    id: "f-001",
    deck: "Administrativo essencial",
    subject: "Direito Administrativo",
    type: "basic",
    front: "Quando a administracao pode revogar um ato administrativo?",
    back: "Quando o ato e legal, discricionario e deixou de ser conveniente ou oportuno, respeitados direitos adquiridos.",
    tags: ["atos", "revogacao"]
  },
  {
    id: "f-002",
    deck: "Constitucional - competencias",
    subject: "Direito Constitucional",
    type: "cloze",
    front: "Compete {{c1::privativamente a Uniao}} legislar sobre diretrizes e bases da educacao nacional.",
    back: "Art. 22, XXIV, CF/88.",
    tags: ["cf88", "competencias"]
  }
];

export const reviewQueue: ReviewState[] = [
  ...questions.map((question) => initialReviewState(question.id, "question")),
  ...flashcards.map((card) => initialReviewState(card.id, "flashcard"))
];
