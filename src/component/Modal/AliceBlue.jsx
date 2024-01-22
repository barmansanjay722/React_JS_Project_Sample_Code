import { Container, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import store from "../../redux";
import { setModal } from "../../redux/features/authslice";

const AliceBlue = ({ showModal }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      setModal({
        showModal: false,
      })
    );
  };

  const handleSubmit = () => {
    dispatch(
      setModal({
        showModal: false,
      })
    );
    const url = store.getState().auth.authUrl;
    window.location.replace(url);
  };

  return (
    <>
      <Container>
        <Modal show={showModal} size="md">
          <Modal.Header className="modal-header">
            <Modal.Title>AliceBlue</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body" py-0 text-center>
            <div>
              <img
                src="./assets/images/aliceblue-login.jpg"
                alt="PayU"
                width="100%"
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="float-right"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
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

export default AliceBlue;
