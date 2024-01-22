// import "./SignIn.css";
import SignInIllustration from "./SignInIllustration/SignInIllustration";
import SignInForm from "./SignInContainer/SignInForm";
import{Link} from "react-router-dom";
import { useEffect } from "react";

const SignIn=()=>{
 
      useEffect(() => {
        window.addEventListener('popstate', (e) => {
          window.history.go(1);
        });
      }, []);
   return (
      <> 
          <div className="wrapper">
              <div className="page-body auth px-xl-4 px-sm-2 px-0 py-lg-2 py-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-7 col-lg-6 col-md-12">
                              <SignInIllustration />
                            </div>

                            <div className="col-lg-5 d-flex justify-content-center align-items-center">
                                <div className="w-100 p-4 p-md-5 card">
                                  <SignInForm />
                                </div>
                            </div>
                        </div>
                        {/* <div className="text-end mt-1 mb-0"><Link to="/adminlogin">Admin Login</Link></div> */}
                    </div>
              </div>
          </div>
         
      </>
    );
}
export default SignIn;
