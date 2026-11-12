import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { EyeMark, Wordmark } from "@/components/wordmark";
import { works, type Work } from "@/data/works";
import { type Availability, NFTMarket } from "@/components/nft-market";
import { NFTDeploy } from "@/components/nft-deploy";
import { MarketHeader } from "@/components/market-header";
import { CreatorDashboard, NFTDropMint } from "@/components/nft-drops";
import { MarketHero } from "@/components/market-hero";
import { FanStackNFT } from "@/components/fan-stack-nft";
import { isAddress, type Address } from "viem";
export const Route = createFileRoute("/")({ component: Home });
function Home() {
  const [view, setView] = useState("Explore");
  const [availability, setAvailability] = useState<Availability>("loading");
  const [active, setActive] = useState<Work | null>(null);
  useEffect(() => {
    const update = () =>
      setView(
        /^#token\/[1-9][0-9]{0,76}$/.test(location.hash)
          ? "Token:" + location.hash.slice(7)
          : /^#drop\/0x[0-9a-fA-F]{40}$/.test(location.hash) && isAddress(location.hash.slice(6))
            ? "Drop:" + location.hash.slice(6)
            : location.hash === "#create" || location.hash === "#drops"
              ? "Create"
              : location.hash === "#my-nfts"
                ? "My NFTs"
                : "Explore",
      );
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (location.hash && location.hash !== "#top")
      document
        .getElementById(view.startsWith("Token:") ? "token-detail" : location.hash.slice(1))
        ?.scrollIntoView();
  }, [view]);
  return (
    <div id="top">
      <MarketHeader view={view} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content">
        <MarketHero view={view} availability={availability} onPreview={setActive} />
        {view.startsWith("Drop:") && <NFTDropMint address={view.slice(5) as Address} />}
        {view === "Create" && <CreatorDashboard />}
        <NFTMarket
          tab={view}
          onAvailability={setAvailability}
          onViewChange={(next) => {
            setView(next);
            location.hash =
              next === "My NFTs" ? "my-nfts" : next === "Create" ? "create" : "explore";
          }}
        />
        {view === "Explore" && (
          <>
            <FanStackNFT
              items={works}
              onSelectWork={(id) => {
                const work = works.find((work) => work.id === id);
                if (work) setActive(work);
              }}
            />
            <section id="studio" className="studio-section" aria-labelledby="studio-title">
              <div className="section-heading">
                <div>
                  <span className="section-eyebrow">The RareCognos perspective</span>
                  <h2 id="studio-title">From the studio.</h2>
                  <p>A study in form, texture, and the unexpected.</p>
                </div>
                <span className="studio-note">
                  {works.length.toString().padStart(2, "0")} works · Studio previews, not sale
                  listings
                </span>
              </div>
              <ul className="studio-grid">
                {works.map((work) => (
                  <li key={work.id}>
                    <WorkCard work={work} onOpen={() => setActive(work)} />
                  </li>
                ))}
              </ul>
            </section>
            <section className="creator-invitation" aria-labelledby="creator-title">
              <div>
                <span className="section-eyebrow">For the ones who create</span>
                <h2 id="creator-title">
                  Your next work
                  <br />
                  belongs here.
                </h2>
              </div>
              <div>
                <p>
                  Bring your digital artwork to RareCognos. Upload your image, mint to your wallet,
                  and list it when you’re ready.
                </p>
                <a className="primary-action" href="#create">
                  Create a work <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <span className="creator-note">
                  Built on LiteForge testnet · Test currency only
                </span>
              </div>
            </section>
          </>
        )}
        <NFTDeploy />
      </main>
      <footer className="market-footer">
        <Wordmark />
        <p>For the way you see.</p>
        <a href="#explore">Explore NFTs</a>
      </footer>
      {active && <WorkDialog work={active} onClose={() => setActive(null)} />}
    </div>
  );
}
function WorkCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="studio-card group">
      <img src={work.image} alt="" loading="lazy" className="studio-card-image" />
      <span className="absolute top-4 left-4 rounded-full border border-line bg-bg/70 px-3 py-1 text-xs tracking-wide text-fg backdrop-blur-sm">
        Studio work
      </span>
      <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-line bg-bg/70 text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
      <span className="relative mt-auto flex items-end justify-between gap-4 bg-gradient-to-t from-bg via-bg/80 to-transparent p-5 pt-24">
        <span>
          <span className="block text-lg font-medium tracking-tight">{work.title}</span>
          <span className="mt-1 block font-serif text-base text-fg/75 italic">{work.medium}</span>
        </span>
      </span>
    </button>
  );
}

function WorkDialog({ work, onClose }: { work: Work; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="overflow-hidden rounded-2xl"
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="grid md:grid-cols-2">
        <img src={work.image} alt="" className="h-72 w-full object-cover md:h-full" />
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest text-fg/50 uppercase">Studio work</p>
              <h2 id={titleId} className="mt-2 text-3xl font-medium tracking-tight">
                {work.title}
              </h2>
              <p className="mt-1 font-serif text-lg text-fg/75 italic">
                {work.medium}, {work.year}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line"
              aria-label="Close details"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-pretty text-fg/75">{work.description}</p>
          <p className="mt-auto text-xs text-fg/45">
            Studio preview. Availability and prices appear in Available to collect.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <EyeMark className="h-4 w-7 object-contain opacity-50" />
            <span className="text-xs tracking-wide text-fg/50">RareCognos</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
