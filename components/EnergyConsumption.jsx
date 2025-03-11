import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import { CardContainer } from "./CardContainer.jsx";

export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";
  const [mode, setMode] = useState("30days");

  useEffect(() => {
    if (mode === "30days") {
      renderChart(containerId, sortByTime(groupByDay(readings)).slice(-30));
    } else {
      renderChart(containerId, sortByTime(readings).slice(-24));
    }
  }, [mode]);

  const totalConsumption = readings.reduce(
    (sum, reading) => sum + reading.value,
    0
  );
  const roundedConsumption = Math.round(totalConsumption);
  const COST_PER_KWH = 0.138; // $0.138 per 1 kWh
  const totalCost = totalConsumption * COST_PER_KWH;
  const roundedCost = Math.round(totalCost);
  const FOOTPRINT_PER_KWH = 0.0002532; // tonnes per 1kWh
  const totalFootprint = totalConsumption * FOOTPRINT_PER_KWH;
  const formattedFootprint = totalFootprint.toFixed(4);

  const cards = [
    { title: "Cost", value: roundedCost, unit: "$" },
    { title: "Consumption", value: roundedConsumption, unit: "kWh" },
    { title: "Footprint", value: formattedFootprint, unit: "tonnes" },
  ];
  console.log("cards", cards);
  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          className={`
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
             ${
               mode === "30days" ? "bg-blue white" : "bg-white darkgrey"
             } border-grey
             
             
              bold
            `}
          style={{
            cursor: "pointer",
          }}
          onClick={() => setMode("30days")}
        >
          Last 30 days
        </button>
        <button
          className={`
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              ${
                mode === "24hours" ? "bg-blue white" : "bg-white darkgrey"
              } border-grey
              bold
            `}
          style={{
            cursor: "pointer",
          }}
          onClick={() => setMode("24hours")}
        >
          Last 24 hours
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <section>
        <CardContainer cards={cards} />
      </section>
    </>
  );
};
