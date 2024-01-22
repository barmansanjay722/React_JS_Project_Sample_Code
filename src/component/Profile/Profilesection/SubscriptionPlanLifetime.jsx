import RadialBarLifetime from "../../Chart/ChartLifeTime.jsx";
const SubscriptionPlanLifetime = () => {
    return (
        <>
            <div className="row g-1" >
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body subscription-plan">
                            <h6 className="card-title mb-3">Subscription Plan</h6>
                            <h4 className="text-info mb-3">Lifetime free</h4>

                            <ul className="list-unstyled mb-3 pb-3 pt-2">
                                <li className="pb-1">
                                    <span className="text-muted me-2 w90 d-inline-block">Type:</span>
                                    Free
                                </li>
                                <li className="pb-1">
                                    <span className="text-muted me-2 w90 d-inline-block">Start Date:</span>2 Jan 2023
                                </li>
                                <li className="pb-1">
                                    <span className="text-muted me-2 w90 d-inline-block">End Date:</span>7 Feb 2023
                                </li>
                                <li className="pb-1">
                                    <span className="text-muted me-2 w90 d-inline-block">Broker:</span>
                                    Alice Blue
                                </li>
                                <li className="pb-1">
                                    <span className="text-muted me-2 w90 d-inline-block">Account Connected:</span>2 Jan 2023, Allie Grater @2pm{" "}
                                </li>
                            </ul>
                            <hr />
                            <div className="d-flex justify-content-around mb-2">
                                <a href="../signin.html">
                                    <i className="fa fa-trash" /> Disconnect Account
                                </a>
                                <a href="../signin.html">
                                    <i className="fa fa-close" /> Cancel Subscription
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SubscriptionPlanLifetime;
