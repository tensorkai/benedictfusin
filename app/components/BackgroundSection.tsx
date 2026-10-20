import type { ReactNode } from "react";
import Image from "next/image";
import type { BackgroundEntry } from "../content";

export default function BackgroundSection({ id, title, intro, entries, children }: {
  id: "education" | "experience";
  title: string;
  intro: string;
  entries: BackgroundEntry[];
  children?: ReactNode;
}) {
  return <section id={id} className="background-section" aria-labelledby={`${id}-title`}>
    <div className="container background-section__layout">
      <div className="background-section__heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
        {children}
      </div>
      <ul className="background-timeline">
        {entries.map((entry) => <li key={entry.id}>
          <div className="background-timeline__meta"><span>{entry.category}</span>{entry.period && <span>{entry.period}</span>}</div>
          <div className="background-timeline__identity">
            {entry.logo && <span className="background-timeline__logo">
              <Image src={entry.logo} alt="" width={40} height={40} />
            </span>}
            <div>
              <h3>{entry.title}</h3>
              <p className="background-timeline__organization">{entry.organization}</p>
            </div>
          </div>
          {entry.detail && <p className="background-timeline__detail">{entry.detail}</p>}
          {entry.href && <a href={entry.href} target={entry.href.startsWith("https:") ? "_blank" : undefined} rel={entry.href.startsWith("https:") ? "noopener noreferrer" : undefined}>{entry.linkLabel}</a>}
        </li>)}
      </ul>
    </div>
  </section>;
}
