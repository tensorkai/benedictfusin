"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ProjectPreview from "./ProjectPreview";
import type { ProjectSlot } from "../content";
import { projectRingPose, wrapProject } from "../lib/project-ring";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ProjectCarousel({ projects }: { projects: ProjectSlot[] }) {
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [step, setStep] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const phase = useRef(0);
  const drag = useRef<{ x: number; y: number; phase: number; id: number } | null>(null);
  const move = useRef<(value: number, settle?: boolean) => void>(() => {});
  const target = useRef(0);
  const released = useRef(false);
  const count = projects.length;
  const active = wrapProject(step, count);
  const go = (delta: number) => move.current(Math.round(target.current) + delta, true);

  useEffect(() => {
    const element = stage.current;
    if (!element || !enhanced || !count) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let idle: ReturnType<typeof setTimeout>;
    function paint() {
      const radius = Math.min(340, element!.clientWidth * .34);
      cards.current.forEach((card, index) => {
        if (!card) return;
        const pose = projectRingPose(index, phase.current, count, radius);
        card.style.transform = `translate(-50%, -50%) translate(${pose.x}px, ${pose.y}px) perspective(1000px) rotateY(${pose.rotation}deg) scale(${pose.scale})`;
        card.style.zIndex = `${Math.round((pose.depth + 1) * 100)}`;
        card.style.opacity = pose.depth < -.2 ? ".32" : "1";
        card.style.pointerEvents = pose.depth < -.2 ? "none" : "auto";
      });
      setStep(Math.round(phase.current));
    }
    function tick() {
      const destination = reduced.matches ? Math.round(target.current) : target.current;
      phase.current = reduced.matches ? destination : phase.current + (destination - phase.current) * .22;
      if (Math.abs(destination - phase.current) < .001) phase.current = destination;
      paint();
      frame = phase.current !== destination ? requestAnimationFrame(tick) : 0;
    }
    move.current = (value, settle = false) => {
      if (count < 2) return;
      target.current = value;
      clearTimeout(idle);
      if (!frame) frame = requestAnimationFrame(tick);
      if (!settle) idle = setTimeout(() => move.current(Math.round(target.current), true), 180);
    };
    function resize() {
      const height = Math.max(0, ...cards.current.map((card) => {
        const content = card?.querySelector<HTMLElement>(".project-card__content");
        return content ? content.offsetHeight + 2 : 0;
      }));
      cards.current.forEach((card) => { if (card) card.style.height = `${height}px`; });
      element!.style.height = `${Math.max(360, height + 70)}px`;
      paint();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    cards.current.forEach((card) => {
      if (!card) return;
      observer.observe(card);
      const content = card.querySelector(".project-card__content");
      if (content) observer.observe(content);
    });
    const wheel = (event: WheelEvent) => {
      if (released.current || event.ctrlKey || event.metaKey || count < 2) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element!.clientHeight : 1;
      move.current(target.current + delta * unit / 360);
    };
    const release = (event: KeyboardEvent) => { if (event.key === "Escape") released.current = true; };
    function settle() {
      if (reduced.matches || document.hidden) {
        cancelAnimationFrame(frame); clearTimeout(idle); frame = 0;
        target.current = phase.current = Math.round(target.current); paint();
      }
    }
    resize();
    element.addEventListener("wheel", wheel, { passive: false });
    document.addEventListener("keydown", release);
    reduced.addEventListener("change", settle);
    document.addEventListener("visibilitychange", settle);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(idle); observer.disconnect();
      element.removeEventListener("wheel", wheel); document.removeEventListener("keydown", release);
      reduced.removeEventListener("change", settle); document.removeEventListener("visibilitychange", settle);
    };
  }, [enhanced, count]);

  if (!count) return <p className="projects-empty">Projects will appear here as they are added.</p>;
  return (
    <div className={`project-carousel${enhanced ? " is-enhanced" : ""}`} role="region" aria-roledescription={enhanced ? "carousel" : undefined} aria-label="Selected projects">
      <div className="project-ring" ref={stage} tabIndex={enhanced && count > 1 ? 0 : undefined} aria-label={enhanced ? "Project cards. Use left and right arrow keys to rotate." : undefined}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); go(event.key === "ArrowRight" ? 1 : -1); }
        }}
        onPointerEnter={() => { released.current = false; }}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest("button, a")) return;
          drag.current = { x: event.clientX, y: event.clientY, phase: target.current, id: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.3) {
            move.current(start.phase - dx / Math.min(360, event.currentTarget.clientWidth * .75), true);
          }
        }}
        onPointerUp={(event) => {
          if (!drag.current) return;
          drag.current = null;
          move.current(Math.round(target.current), true);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { drag.current = null; move.current(Math.round(target.current), true); }}
      >
        <div className="project-ring__orbit" aria-hidden="true" />
        {projects.map((project, index) => {
          const selected = active === index;
          const opposite = Math.cos((index - active) * Math.PI * 2 / count) < -.2;
          return (
            <article key={project.code} ref={(element) => { cards.current[index] = element; }} className={`project-card${selected ? " is-selected" : ""}`}
              aria-roledescription={enhanced && selected ? "slide" : undefined}
              aria-label={enhanced && selected ? `${index + 1} of ${count}: ${project.title}` : undefined}
              aria-hidden={enhanced && opposite ? true : undefined}>
              <div className="project-card__content" aria-hidden={enhanced && !selected ? true : undefined} inert={enhanced && !selected}>
                <ProjectPreview project={project} />
                <p className="project-card__domain">{project.domain}</p>
                <h3>{project.title}</h3>
                <p className="project-card__summary">{project.summary}</p>
                <ul className="project-row__tags" aria-label={`${project.title} capabilities`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <div className="project-card__footer"><span>{project.status}</span>{project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live app (opens in a new tab)`}>Open live app ↗</a>}</div>
              </div>
              {enhanced && !selected && !opposite && <button type="button" className="project-card__select" tabIndex={-1} aria-label={`Select ${project.title}`} onClick={() => {
                const forward = wrapProject(index - active, count);
                go(forward <= count / 2 ? forward : forward - count);
              }} />}
            </article>
          );
        })}
      </div>
      {enhanced && <div className="project-carousel__controls">
        <button type="button" aria-label="Previous project" disabled={count < 2} onClick={() => go(-1)}>←</button>
        <p aria-live="polite" aria-atomic="true"><span>{active + 1} / {count}</span><span className="sr-only"> — {projects[active].title}</span></p>
        <button type="button" aria-label="Next project" disabled={count < 2} onClick={() => go(1)}>→</button>
      </div>}
      {enhanced && count > 1 && <p className="project-carousel__hint">Scroll to rotate / swipe to explore. Escape releases scrolling. <a href="#practice">Continue to activity</a></p>}
    </div>
  );
}
