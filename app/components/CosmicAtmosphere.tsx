"use client";

import { useEffect, useRef } from "react";

export default function CosmicAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const update = () => { element.dataset.motion = visible && !document.hidden && !media.matches ? "running" : "paused"; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    media.addEventListener("change", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); media.removeEventListener("change", update); };
  }, []);
  return (
    <div className="cosmic-atmosphere" ref={ref} aria-hidden="true">
      <div className="cosmic-nebula cosmic-nebula--one" />
      <div className="cosmic-nebula cosmic-nebula--two" />
      <div className="cosmic-atmosphere__stars cosmic-stars--far" />
      <div className="cosmic-atmosphere__stars cosmic-stars--middle" />
      <div className="cosmic-atmosphere__stars cosmic-stars--near" />
      <svg className="cosmic-atmosphere__constellations" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="m36 180 70-62 52 110 99-36M1170 90l80 65-35 111 119 40M75 660l82 53-39 110 135 61M1160 720l84-51 83 102-47 107M58 410l72-42 59 70-38 55M1250 450l83 48-38 80" />
        {[[36,180],[106,118],[158,228],[257,192],[1170,90],[1250,155],[1215,266],[1334,306],[75,660],[157,713],[118,823],[253,884],[1160,720],[1244,669],[1327,771],[1280,878],[58,410],[130,368],[189,438],[151,493],[1250,450],[1333,498],[1295,578]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />)}
      </svg>
    </div>
  );
}
