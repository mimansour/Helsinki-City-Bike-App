export const fromMetersToKm = (distance: number) =>
  Number((distance * 0.001).toFixed(2))

export const fromSecToMin = (duration: number) =>
  Number((duration / 60).toFixed(2))
