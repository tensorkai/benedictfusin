import { test } from "node:test";
import assert from "node:assert/strict";
import { alignContributionWeeks } from "../app/lib/contribution-calendar.ts";

test("partial first weeks stay aligned to Sundays across a year boundary", () => {
  const days = alignContributionWeeks([
    { date: "2025-12-31", count: 0 },
    { date: "2026-01-01", count: 1 },
    { date: "2026-01-03", count: 2 },
    { date: "2026-01-04", count: 3 },
  ]);
  assert.deepEqual(days.map(({ week, weekday }) => [week, weekday]), [[0, 3], [0, 4], [0, 6], [1, 0]]);
  assert.equal(days[0].count, 0);
});

test("sorts without mutation and handles leap days and missing dates", () => {
  const input = [{ date: "2024-03-03" }, { date: "2024-02-29" }, { date: "2024-03-01" }];
  const result = alignContributionWeeks(input);
  assert.deepEqual(result.map(({ date, week, weekday }) => [date, week, weekday]), [
    ["2024-02-29", 0, 4], ["2024-03-01", 0, 5], ["2024-03-03", 1, 0],
  ]);
  assert.equal(input[0].date, "2024-03-03");
  assert.equal("week" in input[0], false);
});

test("empty and single-day calendars", () => {
  assert.deepEqual(alignContributionWeeks([]), []);
  assert.deepEqual(alignContributionWeeks([{ date: "2026-01-04" }]), [{ date: "2026-01-04", week: 0, weekday: 0 }]);
});
