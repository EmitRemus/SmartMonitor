export function formatTemperatureToString(temperature: number): string {
  const meterString = Math.abs(temperature).toFixed(2);
  return `${temperature >= 0 ? '+' : '-'}${meterString}°C`;
}
