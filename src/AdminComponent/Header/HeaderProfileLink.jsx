import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/authslice";
import { userLogout } from "../../services/dashboardService";
import { setInitStrategy } from "../../redux/features/strategySlice";


const BASE_APP_NAME = process.env.REACT_APP_NAME;
// console.log(BASE_APP_NAME);
const HeaderProfileLink = ({data}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await userLogout();
     if (response === true) {
         dispatch(setLogout());
         dispatch(setInitStrategy());
     }
   
 };
  return (
    <>
      <ul className="header-right justify-content-end d-flex align-items-center mb-0" >
        <li className="d-none d-sm-inline-block d-xl-none">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#MynotesModal"
          >
            <svg
              viewBox="0 0 16 16"
              width="18px"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-secondary"
                d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z"
              />
              <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
            </svg>
          </Link>
        </li>
       
        <li className="d-none d-sm-inline-block d-xl-none"></li>

        {/* <li>
          <Link className="nav-link quick-light-dark" to="">
            <svg
              viewBox="0 0 16 16"
              width="18px"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
              <path
                className="fill-secondary"
                d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"
              />
            </svg>
          </Link>
        </li> */}
        <li>
                    <Link className="nav-link quick-light-dark" href="#">
                        <svg viewBox="0 0 16 16" width="18px" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                            <path className="fill-secondary" d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        </svg>
                    </Link>
        </li>

        <li>
          <div className="dropdown morphing scale-left user-profile mx-lg-3 mx-2">
            <Link
              className="nav-link dropdown-toggle rounded-circle after-none p-0"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img
                className="avatar img-thumbnail rounded-circle shadow"
                src="./assets/images/profile_av.png"
                alt=""
              />
            </Link>
            <div className="dropdown-menu border-0 rounded-4 shadow p-0">
              <div className="card border-0">
                <div className="card-body border-bottom d-flex">
                  <img
                    className="avatar rounded-circle"
                    src="./assets/images/profile_av.png"
                    alt=""
                  />
                  <div className="flex-fill ms-3">
                    <h6 className="card-title mb-0">Admin</h6>
                    <span className="text-muted"></span>
                  </div>
                </div>
                <Link
                  to="/"
                  className="btn bg-secondary text-light text-uppercase rounded-0"
                  onClick={handleLogout}
                >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
export default HeaderProfileLink;
