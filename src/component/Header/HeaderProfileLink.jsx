import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/authslice";
import { userLogout } from "../../services/sessionService";
import { setInitStocks } from "../../redux/features/stockSlice";
import { setInitTrade } from "../../redux/features/tradeSlice";
import { setInitStrategy } from "../../redux/features/strategySlice";
import { setInitStrategyAll } from "../../redux/features/strategyAdminSlice";
const HeaderProfileLink = ({ data }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response === true) {
      dispatch(setLogout());
      dispatch(setInitStocks());
      dispatch(setInitTrade());
      dispatch(setInitStrategy());
      dispatch(setInitStrategyAll());
    }
  };
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6466fc7dad80445890edd449/1h0p4kj96";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
  return (
    <>
      <ul className="header-right justify-content-end d-flex align-items-center mb-0">
        <li>
          <Link
            className="nav-link"
            to={
              "https://www.youtube.com/playlist?list=PL_UdynnG8j4HwDJvmMJQBctE1LNSK654j"
            }
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-secondary"
                d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
              ></path>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            className="nav-link"
            to={"https://algotic.tawk.help/"}
            target="_blank"
          >
            <svg
              width="20px"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.99997 1C5.785 1 4.51323 1.52678 3.57555 2.46447C2.63787 3.40215 2.11108 4.67392 2.11108 6V7H3.11108C3.3763 7 3.63065 7.10536 3.81819 7.29289C4.00573 7.48043 4.11108 7.73478 4.11108 8V11C4.11108 11.2652 4.00573 11.5196 3.81819 11.7071C3.63065 11.8946 3.3763 12 3.11108 12H2.11108C1.84587 12 1.59151 11.8946 1.40398 11.7071C1.21644 11.5196 1.11108 11.2652 1.11108 11V6C1.11108 5.21207 1.26628 4.43185 1.56781 3.7039C1.86933 2.97595 2.31129 2.31451 2.86844 1.75736C3.4256 1.20021 4.08703 0.758251 4.81498 0.456723C5.54294 0.155195 6.32315 0 7.99997 0C9.67679 0 10.457 0.155195 11.185 0.456723C11.9129 0.758251 12.5744 1.20021 13.1315 1.75736C13.6887 2.31451 14.1306 2.97595 14.4321 3.7039C14.7337 4.43185 14.8889 5.21207 14.8889 6V12C14.8889 12.663 14.6255 13.2989 14.1566 13.7678C13.6878 14.2366 13.0519 14.5 12.3889 14.5H10.2549C10.1671 14.652 10.0409 14.7783 9.88885 14.866C9.73683 14.9538 9.56439 15 9.38886 15H8.38886C8.12365 15 7.86929 14.8946 7.68176 14.7071C7.49422 14.5196 7.38886 14.2652 7.38886 14C7.38886 13.7348 7.49422 13.4804 7.68176 13.2929C7.86929 13.1054 8.12365 13 8.38886 13H9.38886C9.56439 13 9.73683 13.0462 9.88885 13.134C10.0409 13.2217 10.1671 13.348 10.2549 13.5H12.3889C12.7867 13.5 13.1682 13.342 13.4495 13.0607C13.7308 12.7794 13.8889 12.3978 13.8889 12H12.8889C12.6236 12 12.3693 11.8946 12.1818 11.7071C11.9942 11.5196 11.8889 11.2652 11.8889 11V8C11.8889 7.73478 11.9942 7.48043 12.1818 7.29289C12.3693 7.10536 12.6236 7 12.8889 7H13.8889V6C13.8889 5.34339 13.7595 4.69321 13.5083 4.08658C13.257 3.47995 12.8887 2.92876 12.4244 2.46447C11.9601 2.00017 11.4089 1.63188 10.8023 1.3806C10.1957 1.12933 8.65658 1 7.99997 1Z"></path>
              <path
                className="fill-secondary"
                d="M5.7777 11.5555C5.7777 11.5555 5.33325 11.5555 5.33325 11.1407C5.33325 10.7259 5.7777 9.48146 7.99992 9.48146C10.2221 9.48146 10.6666 10.7259 10.6666 11.1407C10.6666 11.5555 10.2221 11.5555 10.2221 11.5555H5.7777ZM7.99992 9.06665C8.35354 9.06665 8.69268 8.93554 8.94273 8.70216C9.19278 8.46878 9.33325 8.15225 9.33325 7.8222C9.33325 7.49215 9.19278 7.17563 8.94273 6.94225C8.69268 6.70887 8.35354 6.57776 7.99992 6.57776C7.6463 6.57776 7.30716 6.70887 7.05711 6.94225C6.80706 7.17563 6.66659 7.49215 6.66659 7.8222C6.66659 8.15225 6.80706 8.46878 7.05711 8.70216C7.30716 8.93554 7.6463 9.06665 7.99992 9.06665Z"
              ></path>
              <path
                className="fill-secondary"
                d="M6.28723 5.68738C6.24555 5.64848 6.22214 5.59573 6.22214 5.54072C6.22214 5.48571 6.24555 5.43296 6.28723 5.39406C6.3289 5.35516 6.38543 5.33331 6.44436 5.33331H9.55547C9.61441 5.33331 9.67093 5.35516 9.71261 5.39406C9.75428 5.43296 9.7777 5.48571 9.7777 5.54072C9.7777 5.59573 9.75428 5.64848 9.71261 5.68738C9.67093 5.72628 9.61441 5.74813 9.55547 5.74813H6.44436C6.38543 5.74813 6.3289 5.72628 6.28723 5.68738Z"
              ></path>
            </svg>
          </Link>
        </li>
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

        <li className="d-none d-sm-inline-block d-xl-none">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#RecentChat"
          >
            <svg
              viewBox="0 0 16 16"
              width="18px"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path
                className="fill-secondary"
                d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </Link>
        </li>

        <li>
          <Link className="nav-link quick-light-dark" href="#">
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
                    <h6 className="card-title mb-0">
                      {data?.firstName} {data?.lastName}
                    </h6>
                    <span className="text-muted">{data?.email}</span>
                  </div>
                </div>
                <div className="list-group m-2 mb-3">
                  <Link
                    className="list-group-item list-group-item-action border-0"
                    to="/profile"
                  >
                    <i className="w30 fa fa-user" />
                    Profile
                  </Link>
                </div>
                <Link
                  to="/"
                  className="btn bg-secondary text-light text-uppercase rounded-0"
                  onClick={handleLogout
                  }
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
