import PreOnboardingData from "../../../json-api/PreOnboarding";
import { Link } from "react-router-dom";
const PreOnboardingBody = () => {
    return (
        <>
            <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
                <div className="container-fluid">
                    <div className="row g-3 row-deck" >
                        {PreOnboardingData.map((item, index) => (
                            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-12" key={index}>
                                <div className="card ribbon text-center p-2">
                                    <div className="option-3 bg-warning position-absolute text-bold ">Live</div>
                                    <div className="card-body">
                                        {/* <h5>Live Trading</h5> */}
                                        <div className="row">
                                            <div className="col-6">
                                                <div className=" text-center p-2">
                                                    <div className="card-body">
                                                        <img className="img-fluid mb-4 p-5 py-0" src={item.logo2} alt={item.alt2} />
                                                        <h5>{item.title2}</h5>
                                                        <p className="text-muted">{item.desc2}</p>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className=" text-center p-2">
                                                    <div className="card-body">
                                                        <img className="img-fluid mb-4 p-5 py-0" src={item.logo} alt={item.alt} />
                                                        <h5>{item.title}</h5>
                                                        <p className="text-muted">{item.desc}</p>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={item.url} className="btn btn-outline-primary btn-sm px-4 text-uppercase" data-bs-toggle data-bs-target type={item.type}>
                                            Continue
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
                            <div className="card ribbon text-center p-2">
                                <div className="option-3 bg-light-warning position-absolute text-bold">Virtual</div>
                                <div className="card-body">
                                    {/* <h5>Virtual Trading</h5> */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className=" text-center p-2">
                                                <div className="card-body p-3 py-4">
                                                    <img className="img-fluid mb-4 p-5 py-0" src="./assets/images/paper-trading.svg" alt="Connection Request" />
                                                    <h5>Paper Trading</h5>
                                                    <p className="text-muted">To try all manual trading features with virtual money</p>
                                                     </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/home" className="btn btn-outline-primary btn-sm px-4 text-uppercase " data-bs-toggle data-bs-target type="button">
                                            Continue
                                        </Link>
                                </div>
                            </div>
                            </div>
                      </div>
                    
                </div>
            </div>
        </>
    );
};
export default PreOnboardingBody;
