import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";
import ProfileInformation from "./ProfileInformation";
const ProfileHeader = () => {
  return (
    <>
      <div className="page-toolbar px-xl-4 px-sm-2 px-0 py-3">
        <div className="container-fluid">
          {/* <BreadCrumbs /> */}

          {/* .row end */}

          <ProfileInformation />
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
