/**
 * Computes the distance from the bird nest. Uses the same coordinate system and
 * units as the drones API.
 *
 * @param x X position
 * @param y Y position
 * @returns Distance
 */
export const distanceFromNest = (x: number, y: number) => {
  const nestX = 250000;
  const nestY = 250000;

  const distance = Math.sqrt((x - nestX) ** 2 + (y - nestY) ** 2);
  return toMeters(distance);
};

/**
 * Converts the distance units used by the drone API to meters
 *
 * @param units Units
 * @returns Units converted to meters
 */
export const toMeters = (units: number) => {
  return units / 1000;
};
