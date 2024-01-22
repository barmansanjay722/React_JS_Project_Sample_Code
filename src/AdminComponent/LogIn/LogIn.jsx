import LogInIllustration from "./LogInIllustration/LogInIllustration";
import LogInForm from "./LogInContainer/LogInForm";

const LogIn = () => {
  return (
    <>
      <div className="wrapper">
        <div className="page-body auth px-xl-3 px-sm-2 px-0 py-lg-2 py-1">
          <div className="container">
            <div className="row">
              <div className="col-xxl-7 col-lg-6 col-md-12">
                <LogInIllustration />
              </div>

              <div className="col-lg-5 d-flex justify-content-center align-items-center">
                <div className="w-100 p-3 p-md-5 card">
                  <LogInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
