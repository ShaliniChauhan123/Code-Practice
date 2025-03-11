export const COST_PER_KWH = 0.138; // $0.138 per 1 kWh
export const FOOTPRINT_PER_KWH = 0.0002532; // tonnes per 1kWh
export const FIXED_DECIMAL_PLACES = 4;

export const getAnalytics = (readings) => {
  const totalConsumption = readings.reduce(
    (sum, reading) => sum + reading.value,
    0
  );
  const roundedConsumption = Math.round(totalConsumption);

  const totalCost = totalConsumption * COST_PER_KWH;

  const roundedCost = Math.round(totalCost);
  const totalFootprint = totalConsumption * FOOTPRINT_PER_KWH;
  const formattedFootprint = totalFootprint.toFixed(FIXED_DECIMAL_PLACES);
  return { roundedCost, roundedConsumption, formattedFootprint };
};
