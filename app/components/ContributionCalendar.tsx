"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ContributionDay } from "../lib/github-contributions";

function describe(day: ContributionDay) {
  const date = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${day.date}T00:00:00Z`));
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export default function ContributionCalendar({ days }: { days: ContributionDay[] }) {
  const scroll = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(Math.max(0, days.length - 1));
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    if (scroll.current) scroll.current.scrollLeft = scroll.current.scrollWidth;
  }, []);
  if (!days.length) return <p className="calendar-empty">No contribution days available.</p>;

  const weeks = Math.max(...days.map((day) => day.week)) + 1;
  const months: ContributionDay[] = [];
  days.forEach((day, index) => {
    if (index !== 0 && day.date.slice(0, 7) === days[index - 1].date.slice(0, 7)) return;
    // A partial opening month may share a column with the next month's label.
    if (months.length && day.week - months[months.length - 1].week < 2) months.pop();
    months.push(day);
  });
  const selectedDay = days[hovered ?? active];
  return (
    <div className="calendar">
      <p className="sr-only" id="calendar-instructions">Use arrow keys to explore days. Left and right move one week; up and down move one day. Home and End move to the first and last day.</p>
      <div className="calendar__viewport" ref={scroll}>
        <div className="calendar__board" style={{ "--weeks": weeks } as CSSProperties}>
          <div className="calendar__months" aria-hidden="true">
            {months.map((day) => <span key={day.date} style={{ gridColumn: day.week + 1 }}>{new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(new Date(`${day.date}T00:00:00Z`))}</span>)}
          </div>
          <div className="calendar__weekdays" aria-hidden="true">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div>
          <div className="calendar__cells" role="group" aria-label="Daily GitHub contributions" aria-describedby="calendar-instructions">
            {days.map((day, index) => (
              <button
                key={day.date}
                ref={(element) => { cells.current[index] = element; }}
                type="button"
                className="calendar__cell"
                data-level={day.level}
                style={{ gridColumn: day.week + 1, gridRow: day.weekday + 1, "--depth": `${Math.max(1, Math.min(4, day.level))}px` } as CSSProperties}
                aria-label={describe(day)}
                tabIndex={active === index ? 0 : -1}
                onFocus={() => { setActive(index); setHovered(null); }}
                onClick={() => setActive(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onKeyDown={(event) => {
                  const offsets: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
                  let next: number;
                  if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = days.length - 1;
                  else if (event.key in offsets) next = Math.max(0, Math.min(days.length - 1, index + offsets[event.key]));
                  else return;
                  event.preventDefault();
                  setActive(next);
                  cells.current[next]?.focus({ preventScroll: true });
                  cells.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="calendar__caption">
        <p aria-live="polite" aria-atomic="true">{describe(selectedDay)}</p>
        <div className="calendar__legend" aria-label="Color intensity: fewer to more contributions"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
      </div>
    </div>
  );
}
