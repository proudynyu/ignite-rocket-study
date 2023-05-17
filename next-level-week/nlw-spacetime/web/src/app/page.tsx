import { User } from "lucide-react";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        <div className="rounder-full absolute right-0 top-1/2 h-[280px] w-[526px]  -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 blur-full" />
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
        <a
          href=""
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p>
            <span className="max-w-[140px] text-sm leading-snug">
              Crie sua conta
            </span>{" "}
            e salve suas memorias
          </p>
        </a>
      </div>

      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda n registrou nenhuma lembraca, comece a{" "}
            <a href="underline hover:text-gray-50">criar agora</a>!
          </p>
        </div>
      </div>
    </main>
  );
}