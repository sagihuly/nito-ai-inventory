export const generateYearlyData = (supplierType = "Food Supplier") => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let cumulativeSavings = 0;

  return months.map((month, index) => {
    const seasonalFactor = 1 + Math.sin((index / 11) * Math.PI) * 0.5;
    const baseDemand = Math.ceil(
      supplierType === "Food Supplier"
        ? 300000 * seasonalFactor
        : 10000 * seasonalFactor
    );

    const actualDemand = Math.ceil(baseDemand * (0.9 + Math.random() * 0.2));
    const traditionalOrder = Math.ceil(
      actualDemand * (1.2 + Math.random() * 0.1)
    );
    const aiOrder = Math.ceil(actualDemand * (1.05 + Math.random() * 0.05)); // Always 5-10% higher than actual demand

    const traditionalWaste = traditionalOrder - actualDemand;
    const aiWaste = aiOrder - actualDemand;

    const monthlySavings =
      (traditionalWaste - aiWaste) *
      (supplierType === "Food Supplier" ? 15 : 5);

    cumulativeSavings += monthlySavings;

    return {
      month,
      traditionalOrder: Math.round(traditionalOrder / 1000) * 1000,
      aiOrder: Math.round(aiOrder / 1000) * 1000,
      actualDemand: Math.round(actualDemand / 1000) * 1000,
      savings: Math.round(monthlySavings / 1000) * 1000,
      cumulativeSavings: Math.round(cumulativeSavings / 1000) * 1000,
    };
  });
};
