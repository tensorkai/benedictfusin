"use client";

import { useState } from "react";
import type { ProjectSlot } from "../content";

export default function ProjectPreview({ project }: { project: ProjectSlot }) {
  const [failed, setFailed] = useState(false);
  const preview = project.preview && !failed ?
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={project.preview.src} alt={project.preview.alt} width={1440} height={900}
        loading="lazy" decoding="async"
        ref={(image) => { if (image?.complete && !image.naturalWidth) setFailed(true); }}
        onError={() => setFailed(true)} /> :
      <div className="project-card__preview-fallback">Preview unavailable</div>;

  return project.href ?
    <a className="project-card__preview" href={project.href} target="_blank" rel="noopener noreferrer"
      aria-label={`Open ${project.title} live app (opens in a new tab)`}>{preview}</a> :
    <div className="project-card__preview">{preview}</div>;
}
