import React from "react";

const SummaryCard = ({ title, values, date, icon, ruppeeicon }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body d-flex align-items-start p-lg-3 p-2">
          <div className="flex-fill">
            <span className="text-truncate">{title}</span>
            <div className="fs-3 text-primary">
              {/* {ruppeeicon} */}
              {values}</div>
            <span className="text-muted">{date}</span>
          </div>
          <div className="avatar lg rounded-circle no-thumbnail text-light bg-light mt-lg-3">
            <i className={icon}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
