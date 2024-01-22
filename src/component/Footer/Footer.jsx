import {Link} from "react-router-dom";
const Footer=()=>{
    return (
        <>
            <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center">
                <p className="col-md-4 mb-0 text-muted">© 2023 <Link to="/" target="_blank" title="ThemeMakker Infotech LLP">Algotic</Link>, All Rights Reserved.</p>
                <Link className="col-md-4 d-flex align-items-center justify-content-center my-3 my-lg-0 me-lg-auto">
                ALGOTIC
                </Link>
                <ul className="nav col-md-4 justify-content-center justify-content-lg-end">
                <li className="nav-item">Powered By <a href="https://minditsystems.com/" rel="noreferrer" target="_blank" title="Mind IT Systems">Mind IT Systems</a></li>
                </ul>
        </div>
        </>
    )
}
export default Footer