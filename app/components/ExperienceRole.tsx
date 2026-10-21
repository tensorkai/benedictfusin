"use client";

import { useId, useState } from "react";

export default function ExperienceRole({ title, period, detail }: {
  title: string;
  period?: string;
  detail?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return <div className="background-timeline__role" data-open={open}>
    <div className="background-timeline__role-header">
      <div className="background-timeline__role-label">
        <span className="background-timeline__role-title">{title}</span>
        <span className="background-timeline__role-period">{period}</span>
      </div>
      <button type="button" className="background-timeline__toggle"
        aria-label={`${open ? "Hide" : "Show"} details for ${title}`}
        aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          <path d="M1 3h10L6 9z" fill="currentColor" />
        </svg>
      </button>
    </div>
    <div id={panelId} hidden={!open} className="background-timeline__role-body">
      <p className="background-timeline__detail">{detail}</p>
    </div>
  </div>;
}
