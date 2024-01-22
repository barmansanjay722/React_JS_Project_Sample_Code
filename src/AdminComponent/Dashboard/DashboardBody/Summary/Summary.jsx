import React from "react";
import SummaryCard from "./SummaryCard";
import { getAdminSummary } from "../../../../services/dashboardService";

const Summary = () => {
  const { data } = getAdminSummary();

  return (
    <>
      <div className="row g-3 row-deck" >
        <h6 className="modal-title mb-0 mt-0">Summary</h6>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <SummaryCard
            title={"Actual Subscribers"}
            values={data?.subscribers}
            date={"Till date"}
            ruppeeicon={" "}
            icon={"fa fa-user fa-lg text-primary"}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <SummaryCard
            title={"Test Subscribers"}
            values={data?.revenue}
            date={"Till date"}
            ruppeeicon={" "}
            // ruppeeicon={"₹ "}
            icon={"fa fa-user fa-lg text-primary"}
            // icon={"fa fa-inr fa-lg text-secondary"}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <SummaryCard
            title={"Active Users"}
            values={data?.activeUsersToday}
            date={"Today"}
            ruppeeicon={" "}
            icon={"fa fa-user-check fa-lg text-primary"}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <SummaryCard
            title={"Inactive Users"}
            values={data?.inactiveUsersToday}
            date={"Today"}
            ruppeeicon={" "}
            icon={"fa fa-user-xmark fa-lg text-secondary"}
          />
        </div>
      </div>
    </>
  );
};

export default Summary;
