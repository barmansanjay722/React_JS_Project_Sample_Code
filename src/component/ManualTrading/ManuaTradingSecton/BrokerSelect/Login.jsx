import store from "../../../../redux";
import { warnToast } from "../../../Toasts/Toasts"
import { useState,useEffect } from "react";
import Subscription from "../../../Modal/Subscription";
import {  useSelector } from "react-redux";
import AliceBlue from "../../../Modal/AliceBlue";
import { getCustomerProfile } from "../../../../services/profileService";
 
const Login = () => {
  const [isModal, setIsModal] = useState(false);
  const showAliceModal = useSelector((state) => state.auth.showModal);
   const [data,setData] = useState();
   const [canshow,setCanShow] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        const tmp = await getCustomerProfile(); 
        // console.log(tmp); 
        setData(tmp?.data); 
        if(tmp?.data?.isActiveSubscription === "true")
        {
          setCanShow(false);
        }
        
      };
     
      fetchData();
    }, []);
   
    
    
  const handleSubmit = () => {
    const url = store.getState().auth.authUrl;
    
    if(url != null) {
      // if(data?.isActiveSubscription === "false")
      // {
      //   setIsModal(true);
      // }
      // else{
        window.location.replace(url);
      // }
      
      
    } else {
      warnToast("Please select broker");
    }
    
  }

  const handleClose = () => {
    setIsModal(false);
  }
   
  
  return (
    <>
      <div className="card">
        <div className="card-body d-flex">
          <div className="col-md-4">
            <img
              className="img-fluid"
              src="./assets/images/sign-in.svg"
              alt="Create Event"
            />
          </div>
          <div className="col-md-8 ps-4">
            <h5 className="text-primary pt-2">
              Login to your existing account
            </h5>
           {/* {canshow && <p className="text-muted">
              (AlgoTic subscription Fee:{" "}
              <span className="text-secondary">₹ 5000</span> per year)
            </p>}  */}
            {/* Modal */}
            <button
              to="/"
              className="btn btn-outline-primary btn-sm px-4 text-uppercase"
              onClick={handleSubmit}
             
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {
       data?.isActiveSubscription === "false" ? (isModal && <Subscription showModal={isModal} handleModalClose = {handleClose}/>) : null
      }

      {
        data?.isActiveSubscription === "false"? (showAliceModal && <AliceBlue showModal={showAliceModal}/>) : null
      }
      
    </>
  );
};
export default Login;


//  const token = store.getState().auth.token;