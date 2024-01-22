import {Link} from "react-router-dom";
const UpgradeBtn=()=>{
  return(
    <>
    <Link
  className="btn btn-sm lift bg-primary text-light px-4 ms-4 fw-bold"
  to="/manual_trading"
>
  Paper Trading
  <p className="small mb-0">Upgrade Now</p>
</Link>

    </>
  )
}
export default UpgradeBtn