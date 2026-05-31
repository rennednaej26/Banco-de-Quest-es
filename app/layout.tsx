import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Banco de Questoes AI",
  description: "Banco de questoes, flashcards e revisao inteligente para concursos."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
