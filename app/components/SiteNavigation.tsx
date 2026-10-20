"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "../content";

const careerLinks = [
  { id: "toolkit", label: "Toolkit" },
  { id: "workbench", label: "Disciplines" },
  { id: "selected-work", label: "Work" },
  { id: "practice", label: "Activity" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
];
const personalLinks = [{ id: "journal", label: "Journal" }];

export default function SiteNavigation({ mode }: { mode: "career" | "personal" }) {
  const links = mode === "career" ? careerLinks : personalLinks;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function updateActive() {
      let current = "";
      for (const link of links) {
        const section = document.getElementById(link.id);
        if (section && section.getBoundingClientRect().top <= 180) current = link.id;
      }
      setActive(current);
    }
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [links]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link href={mode === "career" ? "/#top" : "/personal#top"} className="brand" aria-label="Benedict Fusin, back to top">
          <span className="brand__mark">BF<span className="brand__satellite" aria-hidden="true" /></span>
          <span className="brand__text">Benedict Fusin</span>
        </Link>
        <nav id="section-navigation" aria-label="Page sections" className={`topbar__nav${open ? " is-open" : ""}`}>
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-github" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <nav className="mode-switch" aria-label="Portfolio view">
          <Link href="/" aria-current={mode === "career" ? "page" : undefined}><span aria-hidden="true">☾</span> Career</Link>
          <Link href="/personal" aria-current={mode === "personal" ? "page" : undefined}><span aria-hidden="true">☼</span> Personal</Link>
        </nav>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="section-navigation" onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
        </button>
      </div>
    </header>
  );
}
