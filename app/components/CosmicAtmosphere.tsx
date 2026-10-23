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
      <svg className="cosmic-atmosphere__kali-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z" />
      </svg>
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
