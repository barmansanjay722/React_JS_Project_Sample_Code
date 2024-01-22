import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { placeSubscription } from "../../services/subscriptionService";
import { errorToast } from "../Toasts/Toasts";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/features/authslice";

const Subscription = ({ showModal, handleModalClose }) => {
  const [isShowModal, setShowModal] = useState(showModal);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const [transactionData] = useState({
    paymentId: "fsfsdfsfshhsd",
    transactionId: "newtransactionid123",
    subscriptionId:1,
    status: "Success",
    amount: 5000
  });
  const handleSubmit = async () => {
    try {
      const response = await placeSubscription(transactionData);
      setIsDisabled(true)
      if (response.status === 201 || response.status === 200) {
        dispatch(
          setModal({
              showModal: true
          }));
        setShowModal(false);
      }
    } catch (error) {
      setIsDisabled(false);
      errorToast("Some thing went wrong");
    }
  };
  return (
    <>
      <Container>
        <Modal show={isShowModal} size="md">
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title style={{'fontSize':'18px'}}>Payment</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <div>
              <img src="./assets/images/payu.jpg" alt="PayU" width="100%" />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button className="float-right" variant="secondary"  onClick={() => handleModalClose()}>
              Cancel
            </Button>
            <Button
              disabled = {isDisabled}
              className="float-left"
              variant="primary "
              onClick={handleSubmit}
            >
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Subscription;
