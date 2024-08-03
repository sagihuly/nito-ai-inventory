import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Button from "./components/Button";
import CustomTooltip from "./components/CustomTooltip";
import "./styles/App.css";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaBalanceScale,
  FaSeedling,
  FaBoxes,
} from "react-icons/fa";
import { generateYearlyData } from "./data/generateYearlyData";

const supplierTypes = [
  {
    name: "Food Supplier",
    items: [
      { name: "Pasta Carbonara", ingredient: "Pasta", costPerUnit: 2.5 },
      { name: "Grilled Chicken", ingredient: "Chicken", costPerUnit: 6.0 },
      { name: "Beef Stir Fry", ingredient: "Beef", costPerUnit: 9.0 },
    ],
  },
  {
    name: "Cleaning Supplier",
    items: [
      { name: "All-purpose Cleaner", unit: "Bottle", costPerUnit: 5 },
      { name: "Mop Heads", unit: "Piece", costPerUnit: 3 },
    ],
  },
];

const generateOrderData = (useAI) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const seasonalFactor = 1 + Math.sin((i / 6) * Math.PI) * 0.2;
    const baseDemand = isWeekend
      ? 100000 * seasonalFactor
      : 70000 * seasonalFactor;
    const actualDemand = Math.floor(baseDemand + (Math.random() - 0.5) * 20000);

    const traditionalOrder = Math.ceil(baseDemand * 1.2);
    const aiOrder = useAI
      ? Math.ceil(actualDemand * (1.05 + Math.random() * 0.05)) // Always 5-10% higher than actual demand
      : traditionalOrder;

    return {
      day: `Day ${i + 1}`,
      traditionalOrder: Math.ceil(traditionalOrder / 1000) * 1000,
      aiOrder: Math.ceil(aiOrder / 1000) * 1000,
      actualDemand: Math.ceil(actualDemand / 1000) * 1000,
    };
  });
};

const Card = ({ children, title }) => (
  <div className="border rounded-lg p-4 mb-4">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    {children}
  </div>
);

const NitoAIInventoryManagement = () => {
  const [orderData, setOrderData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [selectedSupplierType, setSelectedSupplierType] = useState(
    supplierTypes[0]
  );
  const [selectedItem, setSelectedItem] = useState(supplierTypes[0].items[0]);

  useEffect(() => {
    setOrderData(generateOrderData(true));
    setYearlyData(generateYearlyData(selectedSupplierType.name));
  }, [selectedItem, selectedSupplierType]);

  const calculateWaste = (data) => {
    return data.reduce(
      (total, day) => {
        const traditionalWaste = Math.max(
          0,
          day.traditionalOrder - day.actualDemand
        );
        const aiWaste = Math.max(0, day.aiOrder - day.actualDemand);
        return {
          traditional: total.traditional + traditionalWaste,
          ai: total.ai + aiWaste,
        };
      },
      { traditional: 0, ai: 0 }
    );
  };

  const roundUpWaste = (waste) => {
    return {
      traditional: Math.ceil(waste.traditional / 1000) * 1000,
      ai: Math.ceil(waste.ai / 1000) * 1000,
    };
  };

  const rawWaste = calculateWaste(orderData);
  const waste = roundUpWaste(rawWaste);
  const costSaved = (waste.traditional - waste.ai) * selectedItem.costPerUnit;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="title">Nito AI Sub-supplier Management</h1>
      <h2 className="subtitle">Traditional vs AI-Powered Approach</h2>

      <div className="mb-4">
        <h2 className="card-title">Select a Supplier Type:</h2>
        {supplierTypes.map((type) => (
          <Button
            key={type.name}
            onClick={() => {
              setSelectedSupplierType(type);
              setSelectedItem(type.items[0]);
            }}
            selected={selectedSupplierType.name === type.name}
          >
            {type.name}
          </Button>
        ))}

        <h2 className="card-title mt-4">Select an Item:</h2>
        {selectedSupplierType.items.map((item) => (
          <Button
            key={item.name}
            onClick={() => setSelectedItem(item)}
            selected={selectedItem.name === item.name}
          >
            {item.name}
          </Button>
        ))}

        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-bold text-primary">
            {selectedItem.name}
          </h3>
          <p className="text-secondary">
            {selectedSupplierType.name === "Food Supplier"
              ? "Main Ingredient: "
              : "Unit: "}
            <span className="text-bold">
              {selectedItem.ingredient || selectedItem.unit}
            </span>
          </p>
          <p className="text-secondary">
            Cost per Unit:{" "}
            <span className="text-bold">
              ₪{selectedItem.costPerUnit.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <Card title={`Inventory Comparison for ${selectedItem.name}`}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              label={{ value: "Units", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="traditionalOrder"
              fill="#8884d8"
              name="Current Orders Status"
            />
            <Bar dataKey="aiOrder" fill="#82ca9d" name="AI-Powered Order" />
            <Bar dataKey="actualDemand" fill="#ffc658" name="Actual Demand" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="dashboard grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Traditional Approach Waste" className="dashboard-card">
          <div className="dashboard-value">
            {waste.traditional.toLocaleString()}
          </div>
          <div className="dashboard-description">
            units of {selectedItem.ingredient || selectedItem.unit} wasted
          </div>
        </Card>

        <Card title="Nito AI-Powered Approach Waste" className="dashboard-card">
          <div className="dashboard-value">{waste.ai.toLocaleString()}</div>
          <div className="dashboard-description">
            units of {selectedItem.ingredient || selectedItem.unit} wasted
          </div>
        </Card>
      </div>

      <Card title="Cost Saved with Nito AI" className="dashboard-card">
        <div className="dashboard-value">
          ₪{costSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <div className="dashboard-description">estimated savings this week</div>
      </Card>

      <Card title="Yearly Comparison and Savings">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              yAxisId="left"
              label={{ value: "Units", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Savings (₪)",
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="traditionalOrder"
              stroke="#8884d8"
              name="Current orders"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="aiOrder"
              stroke="#82ca9d"
              name="AI-Powered Order"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actualDemand"
              stroke="#ffc658"
              name="Actual Demand"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="savings"
              stroke="#ff7300"
              name="Monthly Savings (₪)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Yearly Savings Analysis">
        <div className="savings-analysis">
          <p className="text-lg mb-4">
            Over the course of a year, Nito AI has significantly optimized the
            restaurant's inventory management:
          </p>

          <div className="savings-stats">
            <div className="stat-item">
              <FaBoxes className="text-2xl mb-2 text-blue-500" />
              <h3>Total Current orders</h3>
              <p>
                {yearlyData
                  .reduce((sum, data) => sum + data.traditionalOrder, 0)
                  .toLocaleString()}{" "}
                units
              </p>
            </div>
            <div className="stat-item">
              <FaChartLine className="text-2xl mb-2 text-green-500" />
              <h3>Total AI-powered orders</h3>
              <p>
                {yearlyData
                  .reduce((sum, data) => sum + data.aiOrder, 0)
                  .toLocaleString()}{" "}
                units
              </p>
            </div>
            <div className="stat-item">
              <FaBalanceScale className="text-2xl mb-2 text-purple-500" />
              <h3>Actual yearly demand</h3>
              <p>
                {yearlyData
                  .reduce((sum, data) => sum + data.actualDemand, 0)
                  .toLocaleString()}{" "}
                units
              </p>
            </div>
          </div>

          <div className="total-savings">
            <FaMoneyBillWave className="text-2xl inline-block mr-2 text-green-600" />
            Total estimated cost savings: ₪
            {yearlyData[
              yearlyData.length - 1
            ]?.cumulativeSavings.toLocaleString()}
          </div>

          <p className="text-lg mt-4 mb-2">
            <FaSeedling className="text-2xl inline-block mr-2 text-green-400" />
            Nito AI achieves these substantial savings by:
          </p>
          <ul className="savings-list">
            <li>Adapting to seasonal demand fluctuations</li>
            <li>Continuously refining predictions based on actual demand</li>
            <li>Minimizing overordering during low-demand periods</li>
            <li>Ensuring adequate stock during high-demand seasons</li>
            <li>Reducing waste across all ingredients and dishes</li>
            <li>Optimizing supplies based on human behavior factors</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default NitoAIInventoryManagement;
