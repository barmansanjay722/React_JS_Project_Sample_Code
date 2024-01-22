import { Link } from "react-router-dom";
import { useState } from "react";
import { getCustomerProfile } from "../../../services/profileService";
import EditEmail from "../../Modal/EditEmail";
import { useEffect } from "react";

const ProfileInformation = () => {
  const [isEmail, setIsEmail] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  let [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const tmp = await getCustomerProfile();
      setData(tmp.data);
    };

    fetchData();
  }, [changeEmail]);

  const HideEmailModal = () => {
    setIsEmail(false);
  };
  const handleEmailModal = () => {
    setIsEmail(true);
  };

  const handleEmailValue = () => {
    if (changeEmail === true) {
      setChangeEmail(false);
    } else {
      setChangeEmail(true);
    }
  };

  return (
    <>
      <div className="doctor-detail order-1 order-md-0 mt-3" >
        <h3>
          {data?.firstName} {data?.lastName}
        </h3>
        <div className="d-flex flex-row flex-wrap align-items-center mb-3 mt-2">
          <div className="me-5 me-md-5">
            <small className="text-muted">Email</small>
            <div className="mb-1 fw-bold">
              {data?.email}
              <Link
                className="fa fa-pencil-square-o fs-6 ms-2"
                title="Edit Email"
                onClick={() => handleEmailModal()}
              />
            </div>

            {/* <Link className="text-success" to="">
              <i className="fa fa-times-circle me-1" /> Verify Now
            </Link> */}
          </div>
          <div className="me-5 me-md-5">
            <small className="text-muted">Phone Number</small>
            <div className="mb-0 fw-bold">
              {data?.phoneNumber}
              {/* <Link
                to="/"
                className="fa fa-pencil-square-o fs-6 ms-2"
              /> */}
            </div>
            {/* <span className="text-success">
              <i className="fa fa-check-circle me-1" /> Verified
            </span> */}
          </div>
        </div>
      </div>
      <EditEmail
        showEditEmailModal={isEmail}
        handleEditEmailModalClose={HideEmailModal}
        emailValue={data}
        changeEmailValue={handleEmailValue}
      />
    </>
  );
};
export default ProfileInformation;
