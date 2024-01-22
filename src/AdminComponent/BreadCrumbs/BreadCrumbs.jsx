import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const BreadCrumbs = () => {
    const [state, setState] = useState({ name: "" });
    const location = useLocation();
    const handleLocationChange = () => {
        
        const newEndpoint = window.location.pathname;
        if (newEndpoint === "/dashboard") {
            setState({ name: "Dashboard" });
        } else if (newEndpoint === "/strategy") {
            setState({ name: "Dashboard / Manage Strategy" });
        } else if (newEndpoint === "/customer") {
            setState({ name: "Dashboard / Customers management" });
        }
        else if (newEndpoint === "/renewal_report") {
            setState({ name: "Dashboard / Renewal Report Management" });
        }  
        else if (newEndpoint === "/registration_report") {
            setState({ name: "Dashboard / Registration Report Management" });
        }
        else if (newEndpoint === "/trade_execution_report") {
            setState({ name: "Dashboard / Trade Execution Report Management" });
        }
        else if (newEndpoint === "/strategy_report") {
            setState({ name: "Dashboard / Strategy Report Management" });
        } 
        else {
            setState({ name: "" });
        }
    };

    useEffect(() => {
        handleLocationChange();
    }, [window.location.pathname]);

    return (
        <div className="page-toolbar px-xl-4 px-sm-2 px-0 pt-3">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col d-flex justify-content-end">
                        <ol className="breadcrumb bg-transparent mb-0">
                            <li className="breadcrumb-item">
                                <Link className="text-danger" to="">
                                    {state?.name}
                                </Link>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbs;
