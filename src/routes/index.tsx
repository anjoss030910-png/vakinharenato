import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import renato from "@/assets/renato.webp.asset.json";
import { CONFIRMED_TOTAL, DONATIONS, FUNDS_USE, GOAL, LAST_UPDATE, UPDATES, brl } from "@/lib/campaign";

const TITLE = "Juntos pelo Renato Anjos — Campanha solidária";
const DESC =
  "Uma corrente de solidariedade para apoiar Renato, de 12 anos, e sua família em um momento delicado. Contribua ou compartilhe.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#historia", label: "História" },
  { href: "#doacoes", label: "Doações" },
  { href: "#transparencia", label: "Transparência" },
];

const SHARE_TEXT =
  "Olá! Quero compartilhar a campanha Juntos pelo Renato Anjos. Estamos reunindo apoio para ajudar Renato e sua família neste momento delicado. Se puder, conheça a campanha e ajude compartilhando:";

function useShare() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  useEffect(() => {
    setUrl(window.location.origin + window.location.pathname);
    setCanNative(typeof navigator.share === "function");
  }, []);
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copie o link da campanha:", url);
    }
  };
  const native = async () => {
    try {
      await navigator.share({ title: "Juntos pelo Renato Anjos", text: SHARE_TEXT, url });
    } catch {
      /* cancelado */
    }
  };
  const share = () => (canNative ? native() : copy());
  return { whatsapp, copy, copied, canNative, native, share };
}

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnPrimary = `${btn} bg-primary text-primary-foreground shadow-soft hover:bg-primary/90`;
const btnOutline = `${btn} border border-primary/30 text-primary hover:bg-accent`;

function Index() {
  const [open, setOpen] = useState(false);
  const s = useShare();
  const pct = CONFIRMED_TOTAL !== null ? Math.min(100, (CONFIRMED_TOTAL / GOAL) * 100) : null;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#topo" className="flex min-w-0 items-center gap-2 font-display text-lg font-semibold text-primary">
            <HeartIcon className="h-5 w-5 shrink-0 text-leaf" />
            <span className="truncate">Juntos pelo Renato Anjos</span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-semibold text-muted-foreground hover:text-primary">
                {n.label}
              </a>
            ))}
            <a href="#doacoes" className={`${btnPrimary} py-2 text-sm`}>Fazer uma doação</a>
          </nav>
          <button
            className="rounded-full border border-border p-2 text-primary md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav aria-label="Menu móvel" className="border-t border-border px-5 pb-4 md:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-foreground">
                {n.label}
              </a>
            ))}
            <a href="#doacoes" onClick={() => setOpen(false)} className={`${btnPrimary} mt-2 w-full`}>Fazer uma doação</a>
          </nav>
        )}
      </header>

      <main id="topo">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:py-14 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-beige px-3 py-1 text-xs font-semibold uppercase tracking-wider text-beige-foreground">
              Campanha solidária
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-primary md:text-5xl">
              Juntos pelo Renato Anjos
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Uma corrente de solidariedade para apoiar Renato e sua família em um momento delicado. Toda
              contribuição e cada compartilhamento ajudam essa campanha a chegar mais longe.
            </p>
            <figure className="mt-7 overflow-hidden rounded-3xl shadow-card">
              <img
                src={renato.url}
                alt="Renato Anjos, de 12 anos, sorrindo"
                className="aspect-[4/3] w-full object-cover object-[70%_60%]"
                width={984}
                height={1143}
              />
            </figure>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24 md:p-8">
            <p className="text-sm font-semibold text-muted-foreground">Meta da campanha</p>
            <p className="font-display text-4xl font-semibold text-primary">{brl(GOAL)}</p>
            <div className="mt-6 rounded-2xl bg-secondary p-4">
              <p className="text-sm font-semibold text-secondary-foreground">Valor arrecadado confirmado</p>
              {CONFIRMED_TOTAL !== null && pct !== null ? (
                <>
                  <p className="mt-1 text-2xl font-bold text-primary">{brl(CONFIRMED_TOTAL)}</p>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-background" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </>
              ) : (
                <p className="mt-1 text-lg font-semibold text-primary">Arrecadação em atualização</p>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a href="#doacoes" className={btnPrimary}>
                <HeartIcon className="h-4 w-4" /> Quero ajudar
              </a>
              <button onClick={s.share} className={btnOutline}>
                <ShareIcon className="h-4 w-4" /> {s.copied ? "Link copiado!" : "Compartilhar campanha"}
              </button>
            </div>
          </aside>
        </section>

        {/* DOAÇÕES */}
        <section id="doacoes" className="scroll-mt-20 bg-secondary/60 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Escolha o valor da sua contribuição</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Cada gesto de solidariedade é importante. Escolha um dos valores abaixo para contribuir com a campanha.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {DONATIONS.filter((d) => d.featured).map((d) => (
                <li key={d.value}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contribuir com ${brl(d.value)} (abre em nova aba)`}
                    className="group flex flex-col items-center rounded-3xl border-2 border-primary/15 bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="text-sm font-semibold text-muted-foreground">Contribuir com</span>
                    <span className="mt-1 font-display text-4xl font-semibold text-primary">{brl(d.value)}</span>
                    <span className={`${btnPrimary} mt-5 w-full py-2.5`}>Doar {brl(d.value)}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              {DONATIONS.filter((d) => !d.featured).map((d) => (
                <li key={d.value}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contribuir com ${brl(d.value)} (abre em nova aba)`}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-5 shadow-card transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-display text-2xl font-semibold text-primary">{brl(d.value)}</span>
                    <span className="text-sm font-semibold text-primary">Doar →</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              O pagamento é feito em uma página externa, aberta em nova aba.
            </p>
            <p className="mx-auto mt-8 max-w-xl rounded-2xl bg-beige px-5 py-4 font-semibold text-beige-foreground">
              Se não puder contribuir agora, compartilhar esta campanha também é uma grande ajuda.
            </p>
          </div>
        </section>

        {/* HISTÓRIA */}
        <section id="historia" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-14 md:grid-cols-[1fr_1.2fr] md:items-center md:py-20">
          <img
            src={renato.url}
            alt="Renato Anjos sorrindo"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover object-[85%_95%] shadow-card"
          />
          <div>
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Conheça a história do Renato</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/85">
              <p>Renato Anjos tem 12 anos e está enfrentando um momento muito delicado de sua vida, relacionado a tumores cerebrais.</p>
              <p>Diante desse desafio, sua família precisa de apoio e solidariedade. A campanha Juntos pelo Renato Anjos nasceu para reunir pessoas dispostas a ajudar e tornar esse caminho um pouco menos difícil.</p>
              <p>Cada contribuição é um gesto de carinho e apoio. Compartilhar a campanha também é uma maneira importante de ajudar a história do Renato a chegar a mais pessoas.</p>
              <p>Juntos, podemos fortalecer essa corrente de solidariedade em torno de Renato e de sua família.</p>
            </div>
          </div>
        </section>

        {/* COMO AJUDA */}
        <section className="bg-beige/60 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">Sua solidariedade faz a diferença</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              Esta campanha tem o objetivo de apoiar Renato e sua família neste momento delicado.
            </p>
            {FUNDS_USE && (
              <p className="mt-4 rounded-2xl bg-card p-5 text-left shadow-card">{FUNDS_USE}</p>
            )}
            {!FUNDS_USE && (
              <p className="mt-4 text-muted-foreground">
                A descrição sobre a destinação dos recursos será publicada aqui assim que for confirmada pela família.
              </p>
            )}
          </div>
        </section>

        {/* TRANSPARÊNCIA */}
        <section id="transparencia" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-14 md:py-20">
          <h2 className="text-center font-display text-3xl font-semibold text-primary md:text-4xl">Transparência e atualizações</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat label="Meta da campanha" value={brl(GOAL)} />
            <Stat label="Total arrecadado confirmado" value={CONFIRMED_TOTAL !== null ? brl(CONFIRMED_TOTAL) : "Em atualização"} />
            <Stat label="Última atualização" value={LAST_UPDATE ?? "Aguardando confirmação"} />
          </div>
          {CONFIRMED_TOTAL === null && (
            <p className="mt-6 text-center text-muted-foreground">
              Os valores arrecadados serão atualizados conforme a confirmação das contribuições.
            </p>
          )}
          <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h3 className="font-display text-xl font-semibold text-primary">Atualizações oficiais da família</h3>
            {UPDATES.length ? (
              <ul className="mt-4 space-y-4">
                {UPDATES.map((u) => (
                  <li key={u.date + u.text} className="border-l-2 border-leaf pl-4">
                    <p className="text-sm font-semibold text-muted-foreground">{u.date}</p>
                    <p>{u.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted-foreground">As atualizações oficiais aparecerão aqui quando forem divulgadas pela família.</p>
            )}
          </div>
        </section>

        {/* COMPARTILHAR */}
        <section className="bg-primary py-14 text-primary-foreground md:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Ajude essa corrente a chegar mais longe</h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={s.whatsapp} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary-foreground text-primary hover:bg-beige`}>
                Compartilhar no WhatsApp
              </a>
              <button onClick={s.copy} className={`${btn} border border-primary-foreground/40 hover:bg-primary-foreground/10`}>
                {s.copied ? "Link copiado!" : "Copiar link da campanha"}
              </button>
              {s.canNative && (
                <button onClick={s.native} className={`${btn} border border-primary-foreground/40 hover:bg-primary-foreground/10`}>
                  <ShareIcon className="h-4 w-4" /> Compartilhar
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-primary">Juntos pelo Renato Anjos</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              As informações desta página são divulgadas pela campanha e pela família ou por responsáveis autorizados.
            </p>
          </div>
          <nav aria-label="Rodapé" className="flex gap-6 text-sm font-semibold">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground hover:text-primary">{n.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-5 text-center">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.3 1.1 4.1 2.3h3C14.3 6.1 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
