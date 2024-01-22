/* eslint-disable react/jsx-no-comment-textnodes */
import { Link } from "react-router-dom";
import { useEffect } from "react";
import GstInformationModal from "../../Modal/GstInformationModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getGstInformation } from "../../../services/profileService";

const GstInformation = () => {
  const [isGstInformation, setIsGstInformation] = useState(false);
  const [changeGstRecord, setChangeGStRecord] = useState(false);
  const [show,setShow] = useState(true);
  let [data, setData] = useState();
  
  const userId = useSelector((state) => state.auth.customerId);

  useEffect(() => {
    const fetchData = async () => {
      const tmp = await getGstInformation(userId);
      setData(tmp.data);
      if(tmp.data.length !== 0)
      {
         setShow(false);
      }
    };

    fetchData();

  }, [changeGstRecord]);
  const HideGstInformation = () => {
    setIsGstInformation(false);
  };
  const handleGstInformation = () => {
    setIsGstInformation(true);
  };

  const handleGstValue = () => {
    if (changeGstRecord === true) {
      setChangeGStRecord(false);
    } else {
      setChangeGStRecord(true);
    }
  };
  return (
    <>
      <div className="col-md-12 col-12" >
        <div className="card">
          <div className="card-body">
            <Link
              to=""
              className="fa fa-pencil-square-o fs-6 ms-2 edit-profile"
              title="Edit Profile"
              onClick={() => handleGstInformation()}
            />
            <h6 className="card-title mb-2">GST Information</h6>
            
            {
              !show && (
                <div className="row">
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0"  >
                    <li className="pb-1 d-flex">
                      <span className="text-muted me-2 w90 d-inline-block">
                        Name:
                      </span>
                      <span className="gst-para">{data?.companyName}</span>
                    </li>
                    <li className="pb-1  d-flex">
                      <span className="text-muted me-2 w90 d-inline-block">
                        Type:
                      </span>
                     <span className="gst-para">{data?.type}</span> 
                    </li>
                    <li  className="pb-1  d-flex">
                      <span className="text-muted me-2 w90 d-inline-block">
                        GSTIN:
                      </span>
                     <span className="gst-para">{data?.gstIn}</span> 
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0 ps-lg-5">
                    <li className="pb-1 d-flex">
                      <span className="text-muted me-2 w90 d-inline-block">
                        Address:
                      </span>
                      <span className="gst-para">{data?.address}</span>
                    </li>
                  </ul>
                </div>
              </div>
              )}
            
          </div>
          <GstInformationModal
            showGstModal={isGstInformation}
            handleGstModalClose={HideGstInformation}
            userGstInformation={data}
            changeGstValue={handleGstValue}
          />
        </div>
      </div>
    </>
  );
};
export default GstInformation;
