import { test } from "node:test";
import assert from "node:assert/strict";
import { wrapProject, projectRingPose } from "../app/lib/project-ring.ts";

test("selection wraps in either direction, including rapid repeated input", () => {
  assert.equal(wrapProject(-1, 4), 3);
  assert.equal(wrapProject(4, 4), 0);
  assert.equal(wrapProject(19, 4), 3);
  assert.equal(wrapProject(-19, 4), 1);
  assert.equal(wrapProject(3, 0), 0);
  assert.equal(wrapProject(8, 1), 0);
});

test("cards travel around a depth ring instead of a linear strip", () => {
  const front = projectRingPose(0, 0, 4, 300);
  const side = projectRingPose(1, 0, 4, 300);
  const back = projectRingPose(2, 0, 4, 300);
  assert.equal(front.x, 0);
  assert.equal(front.scale, 1);
  assert.equal(side.x, 300);
  assert.equal(side.rotation, -45);
  assert.equal(back.depth, -1);
  assert.ok(back.scale < side.scale && side.scale < front.scale);
  const next = projectRingPose(1, 1, 4, 300);
  assert.deepEqual(next, front);
});

test("fractional rotation stays continuous across the last-to-first boundary", () => {
  const before = projectRingPose(0, 3.99, 4, 300);
  const after = projectRingPose(0, 4.01, 4, 300);
  assert.ok(Math.abs(before.x - after.x) < 10);
  assert.ok(Math.abs(before.scale - after.scale) < .001);
  assert.equal(projectRingPose(0, 25, 1, 300).x, 0);
});


test("five live projects wrap smoothly and each card reaches the front", () => {
  assert.equal(wrapProject(5, 5), 0);
  assert.equal(wrapProject(-1, 5), 4);
  for (let index = 0; index < 5; index++) {
    const pose = projectRingPose(index, index, 5, 340);
    assert.equal(pose.x, 0);
    assert.equal(pose.depth, 1);
    assert.equal(pose.scale, 1);
  }
  const before = projectRingPose(0, 4.99, 5, 340);
  const after = projectRingPose(0, 5.01, 5, 340);
  assert.ok(Math.abs(before.x - after.x) < 10);
  assert.ok(Math.abs(before.scale - after.scale) < .001);
});
