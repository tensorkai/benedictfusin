"use client";

import { useEffect, useId, useRef, useState } from "react";
import { certificates, type Certificate } from "../certificates";

export default function FloatingCertificate({ placement }: { placement: Certificate["placement"] }) {
  const item = certificates.find((certificate) => certificate.placement === placement)!;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const element = slot.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.moving = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const opener = trigger.current;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return <div className={`certificate-slot certificate-slot--${placement}`} ref={slot}>
    <button ref={trigger} className="certificate-float" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`View ${item.title} certificate${item.placeholder ? " placeholder" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.preview} alt="" width={720} height={480} loading="lazy" />
      <span>{item.title}<span aria-hidden="true"> ↗</span></span>
    </button>
    <dialog ref={dialog} className="certificate-dialog" aria-labelledby={titleId}
      onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="certificate-dialog__content">
        <div className="certificate-dialog__heading"><h2 id={titleId}>{item.title}</h2><button autoFocus onClick={() => setOpen(false)} aria-label="Close certificate preview">Close ×</button></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.preview} alt={item.placeholder ? "Certificate placeholder. Original document coming soon." : item.title} width={720} height={480} />
        {item.placeholder && <p>Certificate placeholder. Original document coming soon.</p>}
        {item.documentUrl && <a href={item.documentUrl} target="_blank" rel="noopener noreferrer">View original document</a>}
      </div>
    </dialog>
  </div>;
}
