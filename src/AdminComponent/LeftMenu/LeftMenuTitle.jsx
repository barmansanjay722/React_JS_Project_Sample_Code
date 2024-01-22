import {Link} from "react-router-dom";
const LeftMenuTitle = () => {
  return (
    <>
      <div className="title-text d-flex align-items-center mb-4 mt-1">
        <Link to="/dashboard">
          <h4 className="sidebar-title mb-0 flex-grow-1">
            <span className="sm-txt">
              <img
                src="./assets/images/algotic-logo-icon.svg"
                alt=""
                width="40px"
              />
            </span>
            <span>
              <img
                src="./assets/images/logo-text.svg"
                alt=""
                width="75px"
                style={{ paddingLeft: 10 }}
              />
            </span>
          </h4>
        </Link>
      </div>
    </>
  );
};
export default LeftMenuTitle;
