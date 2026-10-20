import FloatingCertificate from "./components/FloatingCertificate";
import TechLogo from "./components/TechLogo";
import DisciplineConsole from "./components/DisciplineConsole";
import ProjectCarousel from "./components/ProjectCarousel";
import SiteShell from "./components/SiteShell";
import FloatingHero from "./components/FloatingHero";
import GitHubContributionScene from "./components/GitHubContributionScene";
import {
  accomplishmentSlots,
  pillars,
  profile,
  projectSlots,
  stack,
  type PillarKey,
} from "./content";

const disciplineMarks: Record<PillarKey, string> = {
  code: "{ }",
  circuits: "⌁",
  canvas: "◐",
};

export default function Home() {
  return (
    <SiteShell mode="career">
      <main id="main">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="container"><FloatingHero /></div>
        </section>

        <section id="toolkit" className="toolkit section">
          <div className="container">
            <div className="toolkit__heading">
              <p className="section-kicker">The toolkit</p>
              <h2>Fluent across the whole signal path.</h2>
              <p>From an interface gesture to an API, a model, a database, or a physical sensor.</p>
            </div>

            <div className="toolkit__body"><div className="stack-table">
              {stack.map((row) => (
                <div key={row.group} className="stack-row">
                  <div className="stack-row__heading">
                    <h3>{row.group}</h3>
                    <p>{row.subtitle}</p>
                  </div>
                  <ul>
                    {row.items.map((tech) => (
                      <li key={tech.name}>
                        <TechLogo src={tech.logo} name={tech.name} />
                        <span>{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div><FloatingCertificate placement="toolkit" /></div>
          </div>
        </section>

        <section id="workbench" className="workbench section">
          <div className="container">
            <div className="section-heading section-heading--wide">
              <div>
                <p className="section-kicker">Three ways of thinking</p>
                <h2>I make ideas cross boundaries.</h2>
              </div>
              <p>
                A screen can control a machine. A circuit can produce a story. A model can
                become something people touch. The interesting work happens between fields.
              </p>
            </div>

            <DisciplineConsole />
            <div className="discipline-list">
              {pillars.map((pillar) => (
                <article key={pillar.key} id={pillar.key} className={`discipline discipline--${pillar.key}`}>
                  <div className="discipline__visual" aria-hidden="true">
                    <span className="discipline__mark">{disciplineMarks[pillar.key]}</span>
                    <span className="discipline__wave" />
                    <span className="discipline__node discipline__node--a" />
                    <span className="discipline__node discipline__node--b" />
                  </div>
                  <div className="discipline__intro">
                    <p>{pillar.domain}</p>
                    <h3>{pillar.label}</h3>
                    <strong>{pillar.title}</strong>
                  </div>
                  <div className="discipline__content">
                    <p>{pillar.body}</p>
                    <ul aria-label={`${pillar.label} work`}>
                      {pillar.deliverables.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="selected-work" className="selected-work section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Selected work</p>
                <h2>Proof lives in the build.</h2>
              </div>
              <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                Browse all repositories <span aria-hidden="true">↗</span>
              </a>
            </div>

            <ProjectCarousel projects={projectSlots} />
          </div>
        </section>

        <div className="container"><FloatingCertificate placement="activity" /></div>

        <section id="practice" className="practice section">
          <div className="container">
            <div className="practice__statement">
              <p className="section-kicker">The daily practice</p>
              <h2>{profile.practice.heading}</h2>
              <p>
                Repetition turns curiosity into range: firmware sketches, model experiments,
                interface studies, and the discipline to keep shipping.
              </p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                View the activity graph <span aria-hidden="true">↗</span>
              </a>
            </div>
            <GitHubContributionScene />
          </div>
        </section>

        <section className="milestones section" aria-labelledby="milestones-title">
          <div className="container milestones__grid">
            <div className="milestones__heading">
              <p className="section-kicker">Field notes</p>
              <h2 id="milestones-title">Where the work is happening now.</h2>
              <FloatingCertificate placement="milestones" />
            </div>
            <ol className="milestone-list">
              {accomplishmentSlots.map((item) => (
                <li key={item.title}>
                  <span>{item.year}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="milestone-list__org">{item.org}</p>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>


      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__prelude">Have a difficult idea?</p>
          <div className="footer__callout">
            <p>Let&apos;s make it real.</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Contact Benedict on GitHub">
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer__meta">
            <span>© 2026 Benedict Fusin</span>
            <span>Electronics engineer / developer / visual maker</span>
            <span>Manila ↔ Hangzhou</span>
          </div>
        </div>
      </footer>
    </SiteShell>
  );
}
