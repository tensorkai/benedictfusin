"use client";

import { useState } from "react";

export default function TechLogo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return <span className="tech-logo" aria-hidden="true">
    {failed ? <span>{name.slice(0, 2)}</span> :
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={src} alt="" width={22} height={22} loading="lazy"
        ref={(image) => { if (image?.complete && image.naturalWidth === 0) setFailed(true); }}
        onError={() => setFailed(true)} />}
  </span>;
}
