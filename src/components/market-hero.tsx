import { useState } from "react";
import { works, type Work } from "@/data/works";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Availability } from "./nft-market";

export function MarketHero({
  view,
  availability,
  onPreview,
}: {
  view: string;
  availability: Availability;
  onPreview: (work: Work) => void;
}) {
  const [selected, setSelected] = useState(0);
  const featured = [works[2], works[3], works[4]];
  const current = featured[selected];
  if (view !== "Explore") {
    const title =
      view === "Create"
        ? "Make it yours."
        : view === "My NFTs"
          ? "An eye for your collection."
          : view.startsWith("Drop:")
            ? "Discover the drop."
            : "A closer look.";
    return (
      <section className="market-hero market-hero--compact" aria-labelledby="hero-title">
        <a className="hero-back" href="#explore">
          Explore RareCognos <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <h1 id="hero-title">{title}</h1>
      </section>
    );
  }
  const exploreHref =
    availability === "empty" || availability === "unconfigured" ? "#studio" : "#explore";
  return (
    <section className="market-hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-content">
          <span className="section-eyebrow hero-eyebrow">
            <span />
            Art meets the on-chain world
          </span>
          <h1 id="hero-title" aria-label="An eye for the rare.">
            An eye for
            <br />
            the <em>rare.</em>
          </h1>
          <p>
            Discover your next NFT. Create your own.
            <br />A new perspective on collecting, built on LitVM.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={exploreHref}>
              Explore NFTs <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="hero-create-link" href="#create">
              Create NFT <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-showcase" role="group" aria-label="Featured studio artworks">
          <div className="showcase-orbit" aria-hidden="true" />
          <div className="showcase-cards">
            {featured.map((work, index) => {
              const position = (index - selected + featured.length) % featured.length;
              return (
                <button
                  key={work.id}
                  type="button"
                  className={`showcase-card showcase-card--${position}`}
                  onClick={() => (position === 0 ? onPreview(work) : setSelected(index))}
                  aria-label={position === 0 ? `Preview ${work.title}` : `Feature ${work.title}`}
                  tabIndex={position === 0 ? 0 : -1}
                >
                  <img
                    src={work.id === "nocturne" ? "/art/nocturne-hero.jpg" : work.image}
                    alt={work.title}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    width="960"
                    height="864"
                  />
                  <span className="showcase-card-label">
                    <span>Studio preview</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
          <div className="showcase-caption">
            <div className="showcase-title" aria-live="polite">
              <strong>{current.title}</strong>
              <span>
                {current.medium} · {current.year}
              </span>
            </div>
            <div className="showcase-navigation">
              <button
                type="button"
                aria-label="Previous featured artwork"
                onClick={() => setSelected((selected + 2) % 3)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <span>{String(selected + 1).padStart(2, "0")} / 03</span>
              <button
                type="button"
                aria-label="Next featured artwork"
                onClick={() => setSelected((selected + 1) % 3)}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-baseline">
        <a href={exploreHref}>
          <ArrowDown size={15} aria-hidden="true" />
          Take a closer look
        </a>
        <span>Digital art. A different perspective.</span>
        <span className="hero-testnet">LiteForge testnet</span>
      </div>
    </section>
  );
}
