import OnboardingData from "../../../json-api/Onboarding";
import { Link } from "react-router-dom";
const OnboardingBody = () => {
  return (
    <>
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
        <div className="container-fluid">
          <div className="row g-3 row-deck" >
            {/* start: Connection Request */}
            {
              OnboardingData.map((item, index) => (
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6" key={index}>
                <div className="card ribbon text-center p-2">
                <div className={item.cardTag}>{item.tag}</div>

                  <div className="card-body">
                    <img
                      className="img-fluid mb-4 p-5 py-0"
                      src={item.logo}
                      alt={item.alt}
                    />
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                    {/* Modal */}
                    <Link
                      to={item.url}
                      className={item.disabled}
                      data-bs-toggle
                      data-bs-target
                      type={item.type}
                      
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* .row end */}
        </div>
      </div>
    </>
  );
};
export default OnboardingBody;
