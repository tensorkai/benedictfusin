export function wrapProject(index: number, count: number) {
  return count > 0 ? ((index % count) + count) % count : 0;
}

export function projectRingPose(index: number, phase: number, count: number, radius: number) {
  const angle = count > 1 ? (index - phase) * Math.PI * 2 / count : 0;
  const depth = Math.cos(angle);
  return {
    x: Math.sin(angle) * radius,
    y: (1 - depth) * 20,
    scale: .7 + .3 * (depth + 1) / 2,
    rotation: -Math.sin(angle) * 45,
    depth,
  };
}
