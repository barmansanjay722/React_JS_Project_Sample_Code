import { Link } from "react-router-dom";

const SignUp=()=>{
    return(
        <>
            <span className="text-muted">Don't have an account yet? <Link to="/signup">Sign up here</Link></span>
        </>
    );
 }
 export default SignUp;