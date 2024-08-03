import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { traditionalOrder, aiOrder, actualDemand, savings } =
      payload[0].payload;
    return (
      <div className="custom-tooltip p-2 bg-white border rounded">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Traditional Order: ${traditionalOrder} units`}</p>
        <p className="intro">{`AI Order: ${aiOrder} units`}</p>
        <p className="intro">{`Actual Demand: ${actualDemand} units`}</p>
        <p className="intro">{`Savings: $${savings}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
