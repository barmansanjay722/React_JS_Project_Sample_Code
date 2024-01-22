import RadialBarDays from "../../Chart/ChartDays.jsx";
import { useSelector } from "react-redux";
import React, { useState,useEffect } from "react";

import { getRenewalHistory } from "../../../services/profileService";
const SubscriptionPlanDays = () => {
  const userId = useSelector((state) => state.auth.customerId);
  const {data} = getRenewalHistory({userId});
  const noOfDaysLeft = data?.noOfDaysLeft;
  return (
    <>
      <div className="col-lg-5" >
        <div className="card">
          <div className="card-body subscription-plan">
            <h6 className="card-title mb-4">Subscription Plan</h6>
            {data?.result===null &&<h4 className="text-info mb-3">Lifetime free</h4>}
           {data?.noOfDaysLeft!==null &&
            <div className="d-flex justify-content-center mt-3">
              <div id="apex-LoantoValue" />
              {noOfDaysLeft !== undefined && <RadialBarDays  days={ noOfDaysLeft} /> }
             
            </div> }
            <ul className="list-unstyled mb-3 pb-3">
              <li className="pb-1">
                <span className="text-muted me-2 w90 d-inline-block">
                  Type:
                </span>
                {data?.result===null ?"Free":"Paid"}
              </li>
              {data?.startDate!==null&&
              <li className="pb-1">
                <span className="text-muted me-2 w90 d-inline-block">
                  Start Date:
                </span>
              {data?.startDate}
              </li>}
              {data?.endDate!==null&&

              <li className="pb-1">
                <span className="text-muted me-2 w90 d-inline-block">
                  End Date:
                </span>
                {data?.endDate}
              </li>
              }
              {/* <li className="pb-1">
                <span className="text-muted me-2 w90 d-inline-block">
                  Broker:
                </span>
                Alice Blue
              </li>
              <li className="pb-1">
                <span className="text-muted me-2 w90 d-inline-block">
                  Account Connected:
                </span>
                2 Jan 2023, Allie Grater @2pm{" "}
              </li> */}
            </ul>
            {/* <div className="d-flex justify-content-around mb-2">
              <a href="../signin.html">
                <i className="fa fa-trash" /> Disconnect Account
              </a>
              <a href="../signin.html">
                <i className="fa fa-close" /> Cancel Subscription
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default SubscriptionPlanDays;
