import FloatingCertificate from "../components/FloatingCertificate";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../components/SiteShell";
import { personalUpdates } from "./content";

export const metadata: Metadata = {
  title: "Personal journal — Benedict Fusin",
  description: "Life updates, notes, and moments outside the work of Benedict Fusin.",
};

export default function PersonalPage() {
  const updates = [...personalUpdates].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <SiteShell mode="personal">
      <main id="main" className="personal-main">
        <section className="personal-intro container" aria-labelledby="personal-heading">
          <div className="personal-orbit" aria-hidden="true"><span /><span /><i /></div>
          <p className="section-kicker">Beyond the work</p>
          <h1 id="personal-heading">A little more personal.</h1>
          <p>A place for life updates, small observations, and moments outside the projects.</p>
          <a href="#journal" className="personal-intro__link">Explore the journal <span aria-hidden="true">↓</span></a>
        </section>
        <div className="container"><FloatingCertificate placement="personal" /></div>
        <section id="journal" className="personal-journal container" aria-labelledby="journal-heading">
          <div className="journal-heading"><h2 id="journal-heading">The journal</h2><span>Notes along the way</span></div>
          {updates.length === 0 ? (
            <div className="journal-empty">
              <span className="journal-empty__symbol" aria-hidden="true">✧</span>
              <h3>No updates yet.</h3>
              <p>This space is ready for the first story. Check back for new notes and moments.</p>
              <Link href="/">Explore my career work <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <div className="journal-entries">
              {updates.map((update) => (
                <article className="journal-entry" key={update.id}>
                  <time dateTime={update.publishedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${update.publishedAt}T00:00:00Z`))}</time>
                  <h3>{update.title}</h3>
                  {update.image && <Image {...update.image} alt={update.image.alt} sizes="(max-width: 768px) 90vw, 720px" />}
                  {update.paragraphs.map((paragraph, index) => <p key={`${update.id}-${index}`}>{paragraph}</p>)}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="personal-footer container"><span>© 2026 Benedict Fusin</span><Link href="/">Back to career <span aria-hidden="true">↗</span></Link></footer>
    </SiteShell>
  );
}
