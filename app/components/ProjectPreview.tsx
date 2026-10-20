"use client";

import { useState } from "react";
import type { ProjectSlot } from "../content";

export default function ProjectPreview({ project }: { project: ProjectSlot }) {
  const [failed, setFailed] = useState(false);
  return <div className="project-card__preview">
    {project.preview && !failed ?
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={project.preview.src} alt={project.preview.alt} width={800} height={500}
        loading="lazy" decoding="async"
        ref={(image) => { if (image?.complete && !image.naturalWidth) setFailed(true); }}
        onError={() => setFailed(true)} /> :
      <div className="project-card__preview-fallback" aria-hidden="true"><span />{project.title}</div>}
  </div>;
}
