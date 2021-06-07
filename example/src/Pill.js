import React from "react";

const Pill = ({ title, value, style }) => {
  return (
    <div style={style} className="pill">
      <h6>{title}</h6>
      <p>{value}</p>
    </div>
  );
};

export default Pill;
