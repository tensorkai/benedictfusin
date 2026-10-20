"use client";
import { useRef, useState } from "react";
import { pillars, type PillarKey } from "../content";
const glyphs: Record<PillarKey, string> = { code: "</>", circuits: "⌁", canvas: "◐" };
export default function DisciplineConsole() {
  const [activeChannel, setActiveChannel] = useState<PillarKey>("code");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentPillar = pillars.find((pillar) => pillar.key === activeChannel) ?? pillars[0];

  function selectWithKeyboard(index: number, key: string) {
    let next = index;

    if (key === "ArrowRight") next = (index + 1) % pillars.length;
    else if (key === "ArrowLeft") next = (index + pillars.length - 1) % pillars.length;
    else if (key === "Home") next = 0;
    else if (key === "End") next = pillars.length - 1;
    else return;

    setActiveChannel(pillars[next].key);
    tabs.current[next]?.focus();
  }

  return (
      <div className="discipline-console">
        <div className="discipline-console__tabs" role="tablist" aria-label="Benedict's disciplines">
          {pillars.map((pillar, index) => {
            const selected = pillar.key === activeChannel;
            return (
              <button
                key={pillar.key}
                ref={(element) => { tabs.current[index] = element; }}
                id={`discipline-${pillar.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="discipline-panel"
                tabIndex={selected ? 0 : -1}
                className="discipline-tab"
                onClick={() => setActiveChannel(pillar.key)}
                onKeyDown={(event) => {
                  if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                    event.preventDefault();
                    selectWithKeyboard(index, event.key);
                  }
                }}
              >
                <span className="discipline-tab__glyph" aria-hidden="true">{glyphs[pillar.key]}</span>
                <span>
                  <strong>{pillar.label}</strong>
                  <small>{pillar.domain}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="discipline-panel"
          role="tabpanel"
          aria-labelledby={`discipline-${activeChannel}`}
          className="discipline-console__panel"
          tabIndex={0}
        >
          <span className="discipline-console__pulse" aria-hidden="true" />
          <div>
            <p className="discipline-console__title">{currentPillar.title}</p>
            <p className="discipline-console__body">{currentPillar.body}</p>
          </div>
          <a href={`#${activeChannel}`}>Open this discipline <span aria-hidden="true">↓</span></a>
        </div>
      </div>
  );
}
