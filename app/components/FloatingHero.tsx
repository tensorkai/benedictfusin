"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { useHeroMotion } from "./useHeroMotion";
import { profile } from "../content";

export default function FloatingHero() {
  const hero = useRef<HTMLDivElement>(null);
  const [painted, setPainted] = useState(true);
  const [motionPaused, setMotionPaused] = useState(false);
  useHeroMotion(hero, motionPaused);
  return (
    <div className="hero" ref={hero}>
      <div className="hero__status" aria-label="Current status">
        <span className="status-light" aria-hidden="true" />
        Available for ambitious builds
      </div>

      <div className="hero__identity">
        <h1 id="hero-heading" className="hero__name" aria-label="Benedict Fusin">
          <span className="hero__name-metal" aria-hidden="true">
            {profile.name.split(" ").map((word, wordIndex) => <span className="hero__name-word" key={word}>
              {Array.from(word).map((letter, index) => <span className="hero__letter" key={index} style={{ "--letter-index": index + (wordIndex === 0 ? 0 : 8) } as CSSProperties}>{letter}</span>)}
              {wordIndex === 0 && <span className="hero__name-space"> </span>}
            </span>)}
          </span>
        </h1>
        <svg className="hero__triangles" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true">
          <path className="hero__triangle-fill" d="M-40 90 1070 175 380 490Z" />
          <path className="hero__triangle-outline" d="M1050 10 1480 450 220 350Z" />
        </svg>
        <svg className="hero__geometry" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <path className="geometry__field" d="M0 255h1440M0 82 1440 420M0 440 1440 65" />
          <ellipse className="geometry__orbit geometry__orbit--wide" cx="720" cy="260" rx="740" ry="175" transform="rotate(-8 720 260)" />
          <ellipse className="geometry__orbit geometry__orbit--quiet" cx="720" cy="260" rx="650" ry="210" transform="rotate(9 720 260)" />
          <g className="geometry__edge-marks"><path d="M70 100h24m-12-12v24M1340 365h24m-12-12v24M180 415l20-35 20 35ZM1240 70l20 14-20 14-20-14Z" /><circle cx="120" cy="270" r="7" /><circle cx="1320" cy="170" r="5" /></g>
          <g transform="translate(320 0)">
          <g className="geometry__satellites"><circle cx="400" cy="255" r="214" /><circle cx="400" cy="41" r="5" /><path d="M186 255h-18m9-9v18M605 330l8-10 8 10-8 10Z" /></g>
          <circle className="geometry__disc" cx="440" cy="255" r="164" />
          <circle className="geometry__ring" cx="440" cy="255" r="184" />
          <ellipse className="geometry__orbit" cx="400" cy="282" rx="310" ry="103" transform="rotate(-23 400 282)" />
          <ellipse className="geometry__orbit geometry__orbit--quiet" cx="400" cy="282" rx="288" ry="115" transform="rotate(22 400 282)" />
          <g className="geometry__wire">
            <path d="m152 143 70-29 53 54-70 30-53-55Zm0 0-10 76 53 54 10-75m70-30-10 76-70 29m-53-54 70-29 53 54m-43-130-10 76" />
            <path d="m622 334 45-23 40 34-45 23-40-34Zm0 0-4 49 40 34 4-49m45-23-4 49-45 23m-40-34 45-23 40 34m-36-83-4 49" />
          </g>
          <path className="geometry__spark" d="M657 123v38m-19-19h38M117 333v22m-11-11h22" />
          <circle className="geometry__dot" cx="161" cy="385" r="9" />
          <circle className="geometry__dot" cx="654" cy="221" r="5" />
          <path className="geometry__triangle" d="m558 70 28 8-21 20-7-28Z" />
          </g>
        </svg>
        <div className="portrait-core" data-painted={painted}>
          <svg className="portrait-core__shards" viewBox="0 0 600 600" fill="none" aria-hidden="true">
            <g className="portrait-shards__outer">
              <path d="M65 120 250 65 106 283Z" fill="#526974" />
              <path d="m390 56 147 98-103 97Z" fill="#ff7a24" />
              <path d="m453 336 118 126-199 79Z" fill="#bb8b40" />
              <path d="m47 380 136 56-46 110Z" fill="#e9dfc8" />
            </g>
            <g className="portrait-shards__inner" stroke="#e9dfc8" strokeWidth="2">
              <path d="m18 232 164-129 52 231Z" />
              <path d="m356 112 224 222-163 158Z" />
              <path d="m86 482 207-117 48 204Z" stroke="#ff7a24" />
            </g>
          </svg>
          <div className="portrait-core__lift">
            <span className="portrait-core__reflection" aria-hidden="true" />
            <Image
              src="/benedict-cutout.png"
              alt={painted ? "" : "Portrait of Benedict Fusin"}
              width={378}
              height={370}
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="portrait-core__image portrait-core__image--original"
            />
            <Image
              src="/benedict-painted.webp"
              alt={painted ? "Benedict Fusin with geometric paint across his face and clothing, blending into an angular mural" : ""}
              width={960}
              height={960}
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="portrait-core__image portrait-core__image--painted"
            />
          </div>
        </div>

        <p className="hero__side-note hero__side-note--left">An engineer&apos;s mind.<br />An artist&apos;s eye.</p>
        <p className="hero__side-note hero__side-note--right">Code. Circuits. Canvas.<br />Always connecting the dots.</p>
      </div>

      <div className="hero__art-controls">
        <div className="portrait-switch" role="group" aria-label="Portrait style">
          <button type="button" aria-pressed={painted} onClick={() => setPainted(true)}>Painted</button>
          <button type="button" aria-pressed={!painted} onClick={() => setPainted(false)}>Original</button>
        </div>
        <button className="hero__motion-toggle" type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>
          <span aria-hidden="true">{motionPaused ? "▷" : "Ⅱ"}</span> Pause motion
        </button>
      </div>

      <div className="hero__intro">
        <div className="hero__statement">
          <p className="hero__motto">Turning what if into it works.</p>
          <p className="hero__lead">
            {profile.intro} I study Electronics Engineering and build with the
            community at <strong>{profile.community}</strong>.
          </p>
          <div className="hero__actions">
            <a className="button button--signal" href="#selected-work">
              See selected work
              <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button--quiet"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub / {profile.handle}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
