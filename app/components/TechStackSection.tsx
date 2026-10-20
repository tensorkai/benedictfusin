"use client";

import { useState } from "react";
import { stack } from "../content";

export default function TechStackSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalCount = stack.reduce((acc, row) => acc + row.items.length, 0);

  const filteredRows = stack
    .filter((row) => selectedGroup === "All" || row.group === selectedGroup)
    .map((row) => ({
      ...row,
      items: row.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    }))
    .filter((row) => row.items.length > 0);

  return (
    <div className="stack-explorer">
      {/* Interactive filter bar */}
      <div className="stack-toolbar">
        <div className="stack-tabs" role="tablist" aria-label="Filter tech stack by layer">
          <button
            type="button"
            role="tab"
            aria-selected={selectedGroup === "All"}
            className={`stack-tab ${selectedGroup === "All" ? "is-active" : ""}`}
            onClick={() => setSelectedGroup("All")}
          >
            All Layers <span className="stack-tab__count">{totalCount}</span>
          </button>
          {stack.map((row) => (
            <button
              key={row.group}
              type="button"
              role="tab"
              aria-selected={selectedGroup === row.group}
              className={`stack-tab ${selectedGroup === row.group ? "is-active" : ""}`}
              onClick={() => setSelectedGroup(row.group)}
            >
              {row.group} <span className="stack-tab__count">{row.items.length}</span>
            </button>
          ))}
        </div>

        <label className="stack-search">
          <span className="stack-search__label">Filter</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search language or tool..."
            className="stack-search__input"
          />
        </label>
      </div>

      {/* Horizontal tech stack rows with official logos */}
      <div className="stack-rows">
        {filteredRows.map((row) => (
          <div key={row.group} className="stack-row">
            <div className="stack-row__head">
              <h3 className="stack-row__title">{row.group}</h3>
              <span className="stack-row__sub">{row.subtitle}</span>
            </div>

            <ul className="stack-row__list">
              {row.items.map((tech) => (
                <li key={tech.name} className="tech-chip">
                  <span className="tech-chip__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={22}
                      height={22}
                      loading="lazy"
                    />
                  </span>
                  <span className="tech-chip__name">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {filteredRows.length === 0 && (
          <div className="stack-empty">
            <p>No technologies match &ldquo;{searchQuery}&rdquo;.</p>
            <button
              type="button"
              className="stack-reset-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedGroup("All");
              }}
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
