export const clamp = (value: number) => Math.max(0, value)

export const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil
