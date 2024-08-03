// src/components/YearlySavingsAnalysis.js

import React from "react";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaBalanceScale,
  FaSeedling,
  FaBoxes,
} from "react-icons/fa";
import "./YearlySavingsAnalysis.css";

// Your component code follows...

const YearlySavingsAnalysis = ({ yearlyData }) => {
  const totalTraditionalOrders = yearlyData.reduce(
    (sum, data) => sum + data.traditionalOrder,
    0
  );
  const totalAIOrders = yearlyData.reduce((sum, data) => sum + data.aiOrder, 0);
  const totalActualDemand = yearlyData.reduce(
    (sum, data) => sum + data.actualDemand,
    0
  );
  const totalSavings = yearlyData[yearlyData.length - 1]?.savings || 0;

  return (
    <div className="yearly-savings-analysis p-4 max-w-4xl mx-auto">
      <h2 className="section-title text-3xl font-bold mb-8 text-center">
        Yearly Savings Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="data-card bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center">
          <FaBoxes size={36} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Traditional Orders</h3>
            <p className="text-2xl font-bold">
              {totalTraditionalOrders.toLocaleString()} units
            </p>
          </div>
        </div>
        <div className="data-card bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
          <FaBalanceScale size={36} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total AI-powered Orders</h3>
            <p className="text-2xl font-bold">
              {totalAIOrders.toLocaleString()} units
            </p>
          </div>
        </div>
        <div className="data-card bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
          <FaChartLine size={36} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Actual Yearly Demand</h3>
            <p className="text-2xl font-bold">
              {totalActualDemand.toLocaleString()} units
            </p>
          </div>
        </div>
        <div className="data-card bg-orange-500 text-white p-6 rounded-lg shadow-md flex items-center">
          <FaMoneyBillWave size={36} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">
              Total Estimated Cost Savings
            </h3>
            <p className="text-2xl font-bold">
              ${totalSavings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">
          Nito AI Achieves These Savings By:
        </h3>
        <ul className="achievements-list list-disc list-inside space-y-4 text-lg">
          <li>
            <FaSeedling
              size={20}
              className="inline-block mr-2 text-green-600"
            />{" "}
            Adapting to seasonal demand fluctuations
          </li>
          <li>
            <FaSeedling
              size={20}
              className="inline-block mr-2 text-green-600"
            />{" "}
            Continuously refining predictions based on actual demand
          </li>
          <li>
            <FaSeedling
              size={20}
              className="inline-block mr-2 text-green-600"
            />{" "}
            Minimizing overordering during low-demand periods
          </li>
          <li>
            <FaSeedling
              size={20}
              className="inline-block mr-2 text-green-600"
            />{" "}
            Ensuring adequate stock during high-demand seasons
          </li>
          <li>
            <FaSeedling
              size={20}
              className="inline-block mr-2 text-green-600"
            />{" "}
            Reducing waste across all ingredients and dishes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default YearlySavingsAnalysis;
