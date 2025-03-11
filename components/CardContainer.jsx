import React from "react";

export const Card = ({ title, value, unit, isLast }) => {
  return (
    <div
      style={{ flex: "1" }}
      className={`shadow-2 py1 px2 mr3 roundedMore bg-super-light-grey ${
        !isLast ? "mr3" : ""
      }`}
    >
      <h5 className="h5 darkgray bold">{title}</h5>
      <p className=" h3 darkgray">{value}</p>
      <p className="h5 darkgray">{unit}</p>
    </div>
  );
};

export const CardContainer = ({ cards }) => {
  return (
    <div className="flex" style={{ width: "100%" }}>
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            unit={card.unit}
            isLast={index === card.length - 1}
          />
        );
      })}
    </div>
  );
};
