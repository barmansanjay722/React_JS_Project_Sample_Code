// import "./SignUp.css";
import SignUpIllustration from "./SignUpIllustration/SignUpIllustration";
import SignUpForm from "./SignUpContainer/SignUpForm";

const SignUp=()=>{
    
    return (
    <> 
        <div className="wrapper">
            <div className="page-body auth px-xl-3 px-sm-2 px-0 py-lg-2 py-1">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-7 col-lg-6 col-md-12">
                        <SignUpIllustration />
                        </div>
                        <div className="col-lg-5 d-flex justify-content-center align-items-center" >
                            <div className=" w-100 p-3 p-md-5 card" >
                                <SignUpForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    )
}
export default SignUp;
