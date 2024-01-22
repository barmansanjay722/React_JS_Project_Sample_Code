import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const router = useLocation();
  const path = router.pathname.slice(1).split("/");

  return (
    <div className="page-toolbar px-xl-4 px-sm-2 px-0 pt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col d-flex justify-content-end">
            <ol className="breadcrumb bg-transparent mb-0">
              <li className="breadcrumb-item">
                {path.map((item, index) => (
                  <Link className="text-secondary" to="" key={index}>
                    {item !== "home" && "home/"}
                    {item}
                  </Link>
                ))}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
