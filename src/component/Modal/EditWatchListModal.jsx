import { Modal } from "react-bootstrap";
import { successToast, warnToast } from "../Toasts/Toasts.jsx";
import { removeWatchList } from "../../services/stockService.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchList } from "../../redux/features/stockSlice";

const EditWatchListModal = ({
  showEditWatchListModal,
  handleEditWatchListModalClose,
}) => {
  const data = useSelector((state) => state.stock.watchlist);
  const [isdisable, setIsDisable] = useState(false);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Set the initial checked state with all IDs in the data list
    const initialChecked = data.map((item) => item.id);
    setChecked(initialChecked);
  }, [data]);

  const handleCheck = (event) => {
    let updatedList = [...checked];

    if (event.target.checked) {
      updatedList.push(parseInt(event.target.value));
    } else {
      updatedList = updatedList.filter((item) => item !== parseInt(event.target.value));
    }

    setChecked(updatedList);
  };

  const handleSubmit = async () => {
    setIsDisable(true);
    
      try {
        // Create a new array containing only the checked IDs
        const checkedIds = data.filter((item) => !checked.includes(item.id)).map((item) => item.id);
        const savedUserResponse = await removeWatchList(checkedIds);

        if (
          savedUserResponse.status === 200 ||
          savedUserResponse.status === 201
        ) {
          successToast("Watchlist Updated");
          handleEditWatchListModalClose();
          dispatch(getWatchList());
          setIsDisable(false);
          setChecked([]);
        } else {
          setIsDisable(false);
        }
      } catch {
       // setIsDisable(false);
        handleEditWatchListModalClose();
      }
    
  };

  const modalClose = () => {
    handleEditWatchListModalClose();
    dispatch(getWatchList());
    setSearch("");
  };

  return (
    <>
      <Modal
        show={showEditWatchListModal}
        onHide={()=>modalClose()}
      >
        <Modal.Header className="modal-header">
          <Modal.Title style={{ fontSize: "18px" }}>
            Modify Watchlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body custom_scroll">
          <div className="form-floating mb-4">
            <div className="input-group me-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="property-search"
                aria-describedby="propertySearch"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-text" id="propertySearch">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>

          <ul
            className="list-group list-group-flush list-group-custom custom_scroll mb-0"
            style={{ height: "300px" }}
          >
            {data
              ?.filter((item) =>
                item.instrumentName.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <li
                  className="list-group-item d-flex align-items-center"
                  key={index}
                >
                  <input
                    className="form-check-input table-checkbox"
                    type="checkbox"
                    value={item.id}
                    onChange={handleCheck}
                    checked={checked.includes(item.id)}
                  />
                  <div className="flex-fill ms-3">
                    <div className="h6 mb-0">
                      {item.tradingSymbol}
                      <p className="small text-muted mb-0">{item.instrumentName}</p>
                    </div>
                  </div>
                  <small className="text-muted">{item.exchange}</small>
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="pe-xl-4  modal-footer d-flex justify-content-start text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isdisable}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-white border"
            data-bs-dismiss="modal"
            disabled={isdisable}
            onClick={modalClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWatchListModal;
