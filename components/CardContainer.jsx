import React from "react";

export const Card = ({ title, value, unit, isLast }) => {
  return (
    <div
      style={{ flex: "1" }}
      className={`shadow-2 py1 px2 roundedMore bg-super-light-grey darkgray`}
    >
      <h5 className="h5 bold">{title}</h5>
      <p className=" h3">{value}</p>
      <p className="h5">{unit}</p>
    </div>
  );
};

export const CardContainer = ({ cards }) => {
  return (
    <div className="flex gap2">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            unit={card.unit}
            isLast={index === cards.length - 1}
          />
        );
      })}
    </div>
  );
};
