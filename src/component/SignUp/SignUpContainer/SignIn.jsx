import { Link } from "react-router-dom";

const SignIn=()=>{
    return(
        <>
            <span className="text-muted">Already have an account? <Link to="/">Sign in here</Link></span>
        </>
    );
 }
 export default SignIn;