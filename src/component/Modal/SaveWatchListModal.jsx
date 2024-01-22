import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./save.css";
import { getStockList, getWatchList } from "../../redux/features/stockSlice";
import { saveWatchList } from "../../services/stockService";
import { useDispatch, useSelector } from "react-redux";
import { warnToast, successToast } from "../Toasts/Toasts";

const SaveWatchListModal = ({
  showSaveWatchListModal,
  handleSaveWatchListModalClose,
}) => {
  const [
    checked, setChecked] = useState([]);
  const [isdisable, setIsDisable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [text, setText] = useState("");
  const [stockExchange, setStockExchange] = useState("");

  const data = useSelector((state) => state.stock.watchListStocks);
  const dispatch = useDispatch();

  let obj = {
    searchValue: "",
    exchangeValue: "",
  };

  useEffect(() => {
    dispatch(getStockList(obj));
  }, []);

  useEffect(() => {}, [stockExchange, text]);

  const handleChange = (event) => {
    setText(event.target.value);
    setSearchValue(event.target.value);

    if (event.target.value.length >= 3) {
      obj = {
        searchValue: event.target.value,
        exchangeValue: stockExchange,
      };
      dispatch(getStockList(obj));
    }
  };

  const handleCheck = (event) => {
    const token = event.target.value;
    const instrument = getInstrumentData(token);
    let updatedList = [...checked];

    if (event.target.checked) {
      if (!checkIfAlreadyExist(token)) {
        const updateData = {
          instrumentName: instrument.formattedInsName,
          tradingSymbol: instrument.tradingSymbol,
          token: instrument.token,
          exchange: instrument.exchange,
          expiry:instrument.expiry
        };
        updatedList.push(updateData);
        if (updatedList.length === 0) {
          setIsDisable(true);
        } else {
          setIsDisable(false);
        }
      }
    } else {
      let index = updatedList.findIndex((item) => item.token === token);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    }
    setChecked(updatedList);
  };

  function checkIfAlreadyExist(token) {
    return checked.some((item) => item.token === token);
  }

  // function getSelectedInstrumentIndex(token, updatedList) {
  //   return updatedList.findIndex((item) => item.token === parseInt(token));
  // }

  function getInstrumentData(token) {
    return data.find((item) => item.token === token);
  }

  const handleSubmit = async () => {
    setIsDisable(true);

    if (checked.length === 0) {
      setIsDisable(false);
      setText("");
      handleSaveWatchListModalClose();
      dispatch(getStockList(obj));
    } else {
      try {
        const savedUserResponse = await saveWatchList(checked);

        if (
          savedUserResponse.status === 200 ||
          savedUserResponse.status === 201
        ) {
          dispatch(getWatchList());
          successToast("Watchlist Updated");
          setIsDisable(false);
          dispatch(getStockList(obj));
          setText("");
          setChecked([]);
          handleSaveWatchListModalClose();
        }
      } catch {
        handleSaveWatchListModalClose();
      }
    }
  };

  const modalClose = () => {
    setText("");
    handleSaveWatchListModalClose();
    dispatch(getStockList(obj));
    setChecked([]);
   };

  return (
    <>
      <Modal
        show={showSaveWatchListModal}
        onHide={()=>modalClose()}

      >
        <Modal.Header className="modal-header">
          <Modal.Title style={{ fontSize: "18px" }}>Modify Watchlist</Modal.Title>
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
                onChange={handleChange}
                value={text}
              />
              <span className="input-group-text" id="propertySearch">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>
          {data.length === 0 && <h4 className="text-center">Data not found</h4>}
          <ul
            className="list-group list-group-flush list-group-custom custom_scroll mb-0"
            style={{ height: "300px" }}
          >
            {data?.map((item) => (
              <li
                className="list-group-item d-flex align-items-center"
                key={item.token}
              >
                <input
                  className="form-check-input table-checkbox"
                  type="checkbox"
                  value={item.token}
                  onChange={handleCheck}
                  defaultChecked={item.isFavourite || checkIfAlreadyExist(item.token)}
                  disabled={item.isFavourite}
                  id={item.token}
                />
                <div className="flex-fill ms-3">
                  <div className="h6 mb-0">
                    {item.tradingSymbol}
                    <p className="small text-muted mb-0">{item.formattedInsName}</p>
                  </div>
                </div>
                <small className="text-muted">{item.exchange}</small>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="pe-xl-4 modal-footer d-flex justify-content-start text-center">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isdisable}
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-white border"
            data-bs-dismiss="modal"
            onClick={modalClose}
            disabled={isdisable}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveWatchListModal;
