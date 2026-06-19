// UnderConstruction.jsx
// Tymczasowa sekcja "Strona w budowie" do portfolio (React).
// Wstaw ją jako OSTATNIĄ sekcję pod innymi sekcjami na jednej stronie.
//
// Użycie:
//   import UnderConstruction from "./UnderConstruction";
//   ...
//   <UnderConstruction />
//
// Linki przycisków możesz skierować na swoje sekcje (kotwice):
//   <UnderConstruction homeHref="#hero" contactHref="#kontakt" />
//
// Aby usunąć (gdy sekcja będzie gotowa): skasuj import i <UnderConstruction />.

import React from "react";

/* ─── Ikony jako inline SVG (zero zależności, nie trzeba FontAwesome) ─── */
const Ico = {
  hammer: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.36c.85 0 1.65.33 2.25.93l1.21 1.21" />
    </svg>
  ),
  triangle: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  hardhat: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
    </svg>
  ),
  arrowLeft: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none"
         stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  ),
};

export default function UnderConstruction({
  homeHref = "#",
  contactHref = "#contact",
}) {
  return (
    <section className="uc-section">
      <style>{css}</style>

      {/* pasy ostrzegawcze góra/dół */}
      <div className="uc-hazard top" />
      <div className="uc-hazard bottom" />

      {/* znaki wodne w tle */}
      <span className="uc-water tl">404</span>
      <span className="uc-water br">WIP</span>

      {/* dekoracyjne słupki / tabliczki po bokach */}
      <span className="uc-post l">
        <span className="uc-sign">
          <Ico.triangle /> Uwaga — prace
        </span>
      </span>
      <span className="uc-post r">
        <span className="uc-sign">
          <Ico.hardhat /> Strefa robocza
        </span>
      </span>

      {/* ikona z animacją */}
      <div className="uc-icon-wrap">
        <div className="uc-icon-ring" />
        <div className="uc-icon-square">
          <Ico.hammer />
        </div>
      </div>

      <div className="uc-badge">
        <span className="uc-badge-dot" />
        <span>Work in progress</span>
      </div>

      <h2 className="uc-title">
        Strona<br />w{"\u00A0"}budowie<span className="stop">.</span>
      </h2>

      <p className="uc-sub">
        Wracaj wkrótce
        <span className="sep" />
        Coming soon
      </p>

      <p className="uc-desc">
        Ta sekcja jeszcze powstaje — pracuję nad nią, żeby wszystko było jak
        należy. Tymczasem zerknij na resztę portfolio.
      </p>

      <div className="uc-cta">
        <a href={homeHref} className="uc-btn-primary">
          <Ico.arrowLeft />&nbsp; Wróć do strony głównej
        </a>
        <a href={contactHref} className="uc-btn-ghost">
          <Ico.mail />&nbsp; Daj znać
        </a>
      </div>
    </section>
  );
}

/* ─── Style scoped pod .uc-section, żeby nie kolidowały z resztą portfolio ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

.uc-section {
  /* tokeny tylko dla tej sekcji */
  --red: #cc1111;
  --black: #0b0b0b;
  --surf2: #181818;
  --border: rgba(255,255,255,0.07);
  --text: #e8e8e8;
  --muted: #888;
  --head: 'Barlow Condensed', 'Oswald', 'Arial Narrow', sans-serif;
  --body: 'Barlow', system-ui, -apple-system, sans-serif;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;            /* pełna wysokość ekranu; zmień, jeśli chcesz krótszą sekcję */
  padding: 96px 40px 120px;
  overflow: hidden;
  text-align: center;
  background: var(--black);
  color: var(--text);
  font-family: var(--body);
  line-height: 1.6;
}
.uc-section *, .uc-section *::before, .uc-section *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.uc-section::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(139,0,0,.22) 0%, transparent 60%);
  pointer-events: none;
}

/* pasy ostrzegawcze */
.uc-hazard {
  position: absolute; left: 0; right: 0; height: 22px; z-index: 2;
  background: repeating-linear-gradient(135deg, var(--red) 0 28px, #1a0606 28px 56px);
}
.uc-hazard.top { top: 0; }
.uc-hazard.bottom { bottom: 0; }

/* ikona */
.uc-icon-wrap {
  position: relative; width: 140px; height: 140px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 36px; z-index: 1;
}
.uc-icon-ring { position: absolute; inset: 0; border: 1px solid rgba(204,17,17,.25); border-radius: 50%; }
.uc-icon-ring::before, .uc-icon-ring::after {
  content: ''; position: absolute; inset: -14px; border-radius: 50%;
  border: 1px solid rgba(204,17,17,.12); animation: ucRing 3s ease-out infinite;
}
.uc-icon-ring::after { inset: -28px; animation-delay: 1s; }
@keyframes ucRing {
  0%   { opacity: .8; transform: scale(.85); }
  100% { opacity: 0;  transform: scale(1.15); }
}
.uc-icon-square {
  width: 92px; height: 92px; position: relative;
  background: var(--surf2);
  border: 1px solid var(--border); border-bottom: 2px solid var(--red);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 40px rgba(204,17,17,.25);
}
.uc-icon-square svg {
  font-size: 38px; color: var(--red);
  animation: ucTilt 2.8s ease-in-out infinite; transform-origin: 60% 80%;
}
@keyframes ucTilt {
  0%, 100% { transform: rotate(-8deg); }
  50%      { transform: rotate(14deg); }
}
.uc-icon-square::before, .uc-icon-square::after {
  content: ''; position: absolute; width: 12px; height: 12px;
  border-color: var(--red); border-style: solid; border-width: 0;
}
.uc-icon-square::before { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
.uc-icon-square::after  { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }

/* badge */
.uc-badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 7px 16px; margin-bottom: 22px; z-index: 1;
  background: rgba(204,17,17,.08); border: 1px solid rgba(204,17,17,.3);
  font-family: var(--head); font-size: 11px; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase; color: var(--red);
}
.uc-badge-dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--red);
  box-shadow: 0 0 10px var(--red); animation: ucPulse 1.4s infinite;
}
@keyframes ucPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .35; transform: scale(.85); }
}

/* tytuł */
.uc-title {
  font-family: var(--head);
  font-size: clamp(64px, 11vw, 168px); font-weight: 900; line-height: .85;
  text-transform: uppercase; letter-spacing: -.005em;
  margin-bottom: 20px; z-index: 1; position: relative;
}
.uc-title .stop { color: var(--red); }

.uc-sub {
  font-family: var(--head);
  font-size: clamp(18px, 2vw, 24px); font-weight: 700; letter-spacing: .22em;
  text-transform: uppercase; color: #555;
  margin-bottom: 36px; z-index: 1; position: relative;
}
.uc-sub .sep {
  display: inline-block; width: 8px; height: 8px; background: var(--red);
  transform: rotate(45deg); margin: 0 18px; vertical-align: middle;
}

.uc-desc {
  font-size: 16px; line-height: 1.75; color: #aaa;
  max-width: 520px; margin: 0 auto 40px; z-index: 1; position: relative;
}

/* przyciski */
.uc-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; z-index: 1; position: relative; }
.uc-btn-primary, .uc-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px; padding: 13px 30px;
  font-family: var(--head); font-size: 13px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; text-decoration: none;
  cursor: pointer; transition: background .2s, border-color .2s, color .2s, transform .15s;
}
.uc-btn-primary { background: var(--red); color: #fff; border: none; }
.uc-btn-primary:hover { background: #e01515; transform: translateY(-1px); }
.uc-btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
.uc-btn-ghost:hover { border-color: var(--red); color: var(--red); }

/* dekoracyjne słupki */
.uc-post { position: absolute; bottom: 22px; width: 4px; background: var(--red); z-index: 1; }
.uc-post.l { left: 8%; height: 220px; }
.uc-post.r { right: 8%; height: 180px; }
.uc-post::before { content: ''; position: absolute; top: -2px; left: -8px; width: 20px; height: 6px; background: var(--red); }
.uc-sign {
  position: absolute; top: 10px; padding: 8px 14px; white-space: nowrap;
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--surf2); border: 1px solid var(--border); border-left: 3px solid var(--red);
  font-family: var(--head); font-size: 11px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
}
.uc-sign svg { color: var(--red); }
.uc-post.l .uc-sign { left: 14px; transform: rotate(-2deg); }
.uc-post.r .uc-sign { right: 14px; transform: rotate(3deg); border-left: none; border-right: 3px solid var(--red); }

/* znaki wodne */
.uc-water {
  position: absolute; font-family: var(--head); font-weight: 900;
  color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.04);
  pointer-events: none; user-select: none; z-index: 0; line-height: .8;
}
.uc-water.tl { top: 14%; left: 4%; font-size: clamp(120px, 18vw, 280px); transform: rotate(-8deg); }
.uc-water.br { bottom: 12%; right: 4%; font-size: clamp(90px, 14vw, 220px); transform: rotate(6deg); }

/* RWD */
@media (max-width: 720px) {
  .uc-section { padding: 86px 22px 110px; }
  .uc-post { display: none; }
  .uc-icon-wrap { width: 110px; height: 110px; margin-bottom: 28px; }
  .uc-icon-square { width: 76px; height: 76px; }
  .uc-icon-square svg { font-size: 30px; }
  .uc-sub .sep { margin: 0 10px; }
}
`;
