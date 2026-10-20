"use client";

import { useEffect, type RefObject } from "react";

export function useHeroMotion(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const shell = element.closest<HTMLElement>(".site-shell");
    let frame = 0;
    let visible = true;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    function paint() {
      element!.style.setProperty("--pointer-x", x.toFixed(4));
      element!.style.setProperty("--pointer-y", y.toFixed(4));
      element!.style.setProperty("--light-x", `${50 + x * 45}%`);
      element!.style.setProperty("--light-y", `${50 + y * 45}%`);
      shell?.style.setProperty("--space-x", `${x * -12}px`);
      shell?.style.setProperty("--space-y", `${y * -8}px`);
    }
    function tick() {
      x += (targetX - x) * .12;
      y += (targetY - y) * .12;
      paint();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .001) {
        frame = requestAnimationFrame(tick);
      } else {
        x = targetX; y = targetY; paint(); frame = 0;
      }
    }
    function start() { if (!frame) frame = requestAnimationFrame(tick); }
    function reset() { targetX = 0; targetY = 0; start(); }
    function move(event: PointerEvent) {
      if (reduced.matches || !finePointer.matches || !visible || document.hidden || event.pointerType === "touch") return;
      const rect = element!.querySelector(".hero__identity")!.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      start();
    }
    function updateMotion() {
      const running = visible && !document.hidden && !reduced.matches;
      element!.dataset.motion = running ? "running" : "paused";
      if (!running || !finePointer.matches) {
        cancelAnimationFrame(frame); frame = 0;
        x = y = targetX = targetY = 0; paint();
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateMotion(); });
    observer.observe(element);
    updateMotion();
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", updateMotion);
    finePointer.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", updateMotion);
      finePointer.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
      shell?.style.removeProperty("--space-x");
      shell?.style.removeProperty("--space-y");
    };
  }, [ref]);
}
