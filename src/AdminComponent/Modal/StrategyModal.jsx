import { Modal } from "react-bootstrap";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useFormik } from "formik";
import { addStrategyCheck } from "../../validations/signUpValidation";
import { saveStrategy } from "../../services/strategyService";
import { errorToast, successToast } from "../../component/Toasts/Toasts";
import { useSelector, useDispatch } from "react-redux";
import { getStrategyListData } from "../../redux/features/strategyAdminSlice";
const StrategyModal = ({ showStrategyModal, handleStrategyModalClose }) => {
  const dispatch = useDispatch();
  const [strategyName, setStrategyName] = useState("");
  const [strategyStatus, setStrategyStatus] = useState("");
  const [createdOnStartDate, setCreatedOnStartDate] = useState("");
  const [createdOnEndDate, setCreatedOnEndDate] = useState("");
  const onSubmit = async (values, onSubmitProps) => {
    
    await addStrategy(values, onSubmitProps);
    
  };
  let obj = {
    limit: 5,
    offset: 0,
    strategyName: strategyName,
    strategyStatus: strategyStatus,
    createdOnStartDate: createdOnStartDate,
    createdOnEndDate: createdOnEndDate,
};
  


  const addStrategy = async (data, onSubmitProps) => {
    try {
      // backend api call for POST request
      const savedUserResponse = await saveStrategy(data);
     
        if (
          savedUserResponse.status === 200 ||
          savedUserResponse.status === 201
        ) {
          onSubmitProps.resetForm();
          successToast("Strategy Saved Successfully");
          handleStrategyModalClose();
          dispatch(getStrategyListData(obj));
          
        }
       else if( savedUserResponse?.response?.status === 400 )
       {
        onSubmitProps.resetForm();
          errorToast(savedUserResponse?.response?.data?.errorMessage);
          handleStrategyModalClose();
       }
       else if( savedUserResponse?.response?.status === 409 )
       {
        onSubmitProps.resetForm();
          errorToast(savedUserResponse?.response?.data?.errorMessage);
          handleStrategyModalClose();
       }
    } catch (error) {}
  };
   
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      script: "",
    },
    validationSchema: addStrategyCheck,
    onSubmit,
  });

  const clearForm =()=>{
   
    handleStrategyModalClose();
    resetForm();  
    
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Card Full-Screen
    </Tooltip>
  );
  const modalTollpit =()=>{
    const modal = document.getElementById("modalid");
    modal.style.height = "100vh";
    
  }
  return (
    <>
      <Modal
        show={showStrategyModal}
        onHide={handleStrategyModalClose}
        size="lg"
        
        id="modalid"
      >
      
       
        <Modal.Header closeButton>
        
         <Modal.Title style={{'fontSize':'18px'}}>Add a strategy in AlgoTic</Modal.Title>
          {/* <div className="dropdown morphing scale-right">
            <Link
              to=""
              className="card-fullscreen"
              data-bs-toggle="tooltip"
              title="Card Full-Screen"
            >
              <i className="icon-fullscreen" />
            </Link>
          </div> */}
         
        <div className="card-fullscreen" onClick={modalTollpit}> 
        {/* <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      
    >
      <i className="fa fa-maximize" style={{cursor:"pointer"}} ></i>
    </OverlayTrigger> */}

          </div>
          
        
        </Modal.Header>
        

        <Modal.Body>
          <div className="  mb-0">
            <div className="card-body mb-0 custom_scroll">
              <form className="row g-3" onSubmit={handleSubmit} >
                <div className="col-lg-6 col-md-4 col-sm-12">
                  <label className="form-label">Name </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <p className="text-danger">{errors.name}</p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label className="form-label">Strategy script code </label>
                  <textarea
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="script"
                    name="script"
                    cols={30}
                    rows={4}
                    className="form-control"
                    value={values.script}
                  />
                  {errors.script && touched.script && (
                    <p className="text-danger">{errors.script}</p>
                  )}
                </div>
                <div className="pe-xl-4 d-flex justify-content-start text-center">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-white border"
                    data-bs-dismiss="modal"
                    onClick={clearForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StrategyModal;
