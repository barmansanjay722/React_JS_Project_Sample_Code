import { useState, useEffect } from "react";
import { fetchSocketSession } from "../../../services/socketService";

const TradingButton = () => {
    const [canShow, setCanShow] = useState(true);

    useEffect(() => {
        fetchResponse();
    }, []);

    const fetchResponse = async () => {
        const response = await fetchSocketSession();
        // console.log("---->", response?.data?.paperTrade);
        // if(response === 'BROKER_SESSION_EXPIRED') {
        //   setCanShow(true);
        // }
        // else if (response === true) {
        //   setCanShow(false);
        // }
        if (response?.data?.paperTrade === true) {
            setCanShow(true);
        } else {
            setCanShow(false);
        }
    };

    return (
        <div className="col-md-3 col-12" >
            <div className="card bg-light-warning ribbon">
                <div className="option-10 position-absolute text-light">
                    <i className="fa fa-star"></i>
                </div>
                <div className="card-body pt-3">
                    <h6 className="card-title mb-0">Trading mode</h6>
                    <p className="small mb-3">With paper trading you can do trials without money</p>
                    <div className="input-group">
                        <button className={canShow ? "btn btn-primary" : "btn btn-outline-primary"} type="button">
                            <span className="d-md-inline-block text-uppercase">Paper</span>
                        </button>
                        <button className={!canShow ? "btn btn-primary" : "btn btn-outline-primary"} type="button">
                            <span className="d-md-inline-block text-uppercase">Live</span>
                        </button>
                        {/* <button className=  "btn btn-outline-primary" type="button">
                            <span className="d-md-inline-block text-uppercase">Paper</span>
                        </button>
                        <button className={canShow ? "btn btn-primary" : "btn btn-outline-primary"} type="button">
                            <span className="d-md-inline-block text-uppercase">Live</span>
                        </button> */}

                    </div>
                </div>
            </div>
        </div>
    );
};
export default TradingButton;
