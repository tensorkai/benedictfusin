"use client";

import Image from "next/image";
import { useRef } from "react";
import { useHeroMotion } from "./useHeroMotion";
import { profile } from "../content";

export default function FloatingHero() {
  const hero = useRef<HTMLDivElement>(null);
  useHeroMotion(hero);
  return (
    <div className="hero" ref={hero}>
      <div className="hero__status" aria-label="Current status">
        <span className="status-light" aria-hidden="true" />
        Available for ambitious builds
      </div>

      <div className="hero__identity">
        <h1 id="hero-heading" className="hero__name" aria-label="Benedict Fusin">
          <span className="hero__name-metal" data-text="Benedict Fusin">Benedict Fusin</span>
        </h1>
        <svg className="hero__triangles" viewBox="0 0 900 500" aria-hidden="true">
          <path className="hero__triangle-fill" d="M100 112 660 190 308 475Z" />
          <path className="hero__triangle-outline" d="M598 30 804 434 278 355Z" />
        </svg>
        <svg className="hero__geometry" viewBox="0 0 800 500" fill="none" aria-hidden="true">
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
        </svg>
        <div className="portrait-core">
          <div className="portrait-core__lift">
            <span className="portrait-core__reflection" aria-hidden="true" />
            <Image
              src="/benedict-cutout.png"
              alt="Portrait of Benedict Fusin"
              width={378}
              height={370}
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="portrait-core__image"
            />
          </div>
        </div>

        <p className="hero__side-note hero__side-note--left">An engineer&apos;s mind.<br />An artist&apos;s eye.</p>
        <p className="hero__side-note hero__side-note--right">Code. Circuits. Canvas.<br />Always connecting the dots.</p>
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
