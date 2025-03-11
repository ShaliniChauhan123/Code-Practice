import React, { useEffect, useMemo, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import { CardContainer } from "./CardContainer.jsx";
import { getAnalytics } from "../utils/helper.js";

export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";
  const [mode, setMode] = useState("days");

  const { data, roundedCost, roundedConsumption, formattedFootprint } =
    useMemo(() => {
      const data =
        mode === "days"
          ? sortByTime(groupByDay(readings)).slice(-30)
          : sortByTime(readings).slice(-24);
      return { ...getAnalytics(data), data };
    }, [mode]);

  useEffect(() => {
    renderChart(containerId, data, mode);
  }, [data, mode]);

  const cards = [
    { title: "Cost", value: roundedCost, unit: "$" },
    { title: "Consumption", value: roundedConsumption, unit: "kWh" },
    { title: "Footprint", value: formattedFootprint, unit: "tonnes" },
  ];

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
               mode === "days" ? "bg-normal" : "bg-white unclicked"
             } border-grey 
              bold
              pointer
              mr2
              white
              shadow-2
            `}
          onClick={() => setMode("days")}
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
                mode === "hours" ? "bg-normal" : "bg-white unclicked"
              } border-grey
              bold
              pointer
              white
              shadow-2
            `}
          onClick={() => setMode("hours")}
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
