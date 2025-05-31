const _maxMeter = 999999999.99;
const _maxMeterString = '999999999.99';

export function formatMeterToString(meter: number): string {
  const meterString = Math.min(meter, _maxMeter).toFixed(2);
  return meterString.padStart(_maxMeterString.length, '0');
}
