import { useFormik } from "formik";
import { tradeSetupForm } from "../../../validations/tradeValidation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tradeSetup } from "../../../services/tradeService";
import { successToast } from "../../Toasts/Toasts";
import { getStrategyList } from "../../../redux/features/strategySlice";
import { getTradeList } from "../../../redux/features/tradeSlice";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { fetchStocks } from "../../../services/stockService";
import { tradeOrderInitValues } from "../../../utils/initialValues";
import { fetchSocketSession } from "../../../services/socketService";

const TradeInfoModal = ({ onQuery, showAlertModal, showTradeModal }) => {
  const [value, setValue] = useState("");
  const [tradingSymbol, setTradingSymbol] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [exchangeType, setExchangeType] = useState("");
  const [instrumentType, setInstrumentType] = useState("");
  const [stockType, setStockType] = useState("");
  const [disabledStocks, setDisabledStocks] = useState(true);
  const [disabledOptions, setdisabledOptions] = useState(true);
  const [disableFutures, setdisabledFutures] = useState(true);
  const [canShow, setCanShow] = useState(true);
  const [isStopLossPrice, setIsStopLossPrice] = useState(true);
  const [isTradeProfit, setIsTradeProfit] = useState(true);
  const [token, setToken] = useState();
  const valueStrategy = { limit: 5, offset: 0 };
  const typeaheadRef = useRef(null);
  const [stop, setStop] = useState("");
  const fetchResponse = async () => {
    const response = await fetchSocketSession();

    if (response?.data?.paperTrade === true) {
      setCanShow(false);
    } else {
      setCanShow(true);
    }
  };
  fetchResponse();
  const handleSearch = async (query) => {
    // console.log(query);
    setIsLoading(true);
    const items = await fetchStocks(query, stockType, instrumentType);
    const stocks = items.data;
    // console.log(stocks);
    setIsLoading(false);
    setOptions(stocks);
  };

  const handleStock = async (value) => {
    setInstrumentType(value);
    typeaheadRef.current.clear();
    value === "Stock" ? setDisabledStocks(false) : setDisabledStocks(true);
    value === "Options" ? setdisabledOptions(false) : setdisabledOptions(true);
    value === "Futures" ? setdisabledFutures(false) : setdisabledFutures(true);
  };

  const handleExchange = async (value) => {
    setStockType(value);
    // console.log(stockType);
    typeaheadRef.current.clear();
  };

  const getTrades = {
    limit: 5,
    offset: 0,
  };

  const dispatch = useDispatch();
  const strategyData = useSelector((state) => state.strategy.strategyList);

  useEffect(() => {
    // fetchResponse();
    dispatch(getStrategyList(valueStrategy));
  }, []);

  const handleAlert = async (alertInfo) => {
    onQuery(alertInfo);
    showAlertModal(true);
    showTradeModal(false);
  };

  const onSubmit = async (values, onSubmitProps) => {
    values.instrumentName = value;
    values.tradingSymbol = tradingSymbol;
    values.exchange = exchangeType;
    values.token = token;
    await saveTradeSetupInformation(values, onSubmitProps);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: tradeOrderInitValues,
    validationSchema: tradeSetupForm,
    onSubmit,
  });

  const saveTradeSetupInformation = async (values, onSubmitProps) => {
    try {
      // backend api call for POST request
      const savedtradeResponse = await tradeSetup(values);

      if (savedtradeResponse !== false) {
        if (
          savedtradeResponse.status === 200 ||
          savedtradeResponse.status === 201
        ) {
          dispatch(getTradeList(getTrades));
          onSubmitProps.resetForm();
          successToast("Trade Setup Information Saved");
          handleAlert(savedtradeResponse);
        }
      }
      else{
        if(savedtradeResponse.status === 400) {
          // console.log("log value "+savedtradeResponse.err);
        }
      }
    } catch (error) {
      // console.log("error");
    }
  };

  const handleStopLoss = () => {
    setIsTradeProfit(false);
  };
  const handleTradeProfit = () => {
    setIsStopLossPrice(false);
  };
  return (
    <>
      <div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">
              Trade Type <sup className="text-danger">*</sup>
            </label>
            <input type="hidden" className="form-control" />
            <fieldset>
              <select
                className="array-select form-control form-select"
                aria-label="example"
                id="tradeType"
                name="tradeType"
                value={values.tradeType}
                onChange={(e) => handleChange(e)}
              >
                <option>...</option>
                {canShow && <option value="Live">Live</option>}
                <option value="Paper">Paper</option>
              </select>
              {errors.tradeType && touched.tradeType && (
                <p className="text-danger">{errors.tradeType}</p>
              )}
            </fieldset>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">
              Stock Type <sup className="text-danger">*</sup>
            </label>
            <input type="hidden" className="form-control" />
            <fieldset>
              <select
                className="array-select form-control form-select"
                aria-label="example"
                id="stockType"
                name="stockType"
                value={values.stockType}
                onChange={(e) => {
                  handleChange(e);
                  handleStock(e.target.value);
                }}
              >
                <option>... </option>
                <option value="Stock">Stock</option>
                <option value="Options">Options</option>
                <option value="Futures">Futures</option>
              </select>
              {errors.stockType && touched.stockType && (
                <p className="text-danger">{errors.stockType}</p>
              )}
            </fieldset>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">
              Order Type <sup className="text-danger">*</sup>
            </label>
            <input type="hidden" className="form-control" />
            <fieldset>
              <select
                className="array-select form-control form-select"
                aria-label="example"
                id="orderType"
                name="orderType"
                value={values.orderType}
                onChange={handleChange}
              >
                <option>... </option>
                <option value="MIS">MIS</option>
                {disabledStocks && <option value="Normal">Normal</option>}
                {disabledOptions && disableFutures && (
                  <option value="CNC">CNC</option>
                )}
              </select>
              {errors.orderType && touched.orderType && (
                <p className="text-danger">{errors.orderType}</p>
              )}
            </fieldset>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">
              Exchange <sup className="text-danger">*</sup>
            </label>
            <input type="hidden" className="form-control" />
            <fieldset>
              <select
                className="array-select form-control form-select"
                aria-label="example"
                id="exchange"
                name="exchange"
                value={values.exchange}
                onChange={(e) => {
                  handleChange(e);
                  handleExchange(e.target.value);
                }}
              >
                <option>... </option>

                {disabledStocks && <option value="NSE">NFO</option>}
                {disabledStocks && <option value="BSE">BFO</option>}

                {disabledOptions && disableFutures && (
                  <option value="NSE">NSE</option>
                )}
                {disabledOptions && disableFutures && (
                  <option value="BSE">BSE</option>
                )}
              </select>
              {errors.exchange && touched.exchange && (
                <p className="text-danger">{errors.exchange}</p>
              )}
            </fieldset>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 typeahead">
            <label className="form-label">
              Instrument <sup className="text-danger">*</sup>
            </label>

            <div className="search-container">
              <div className="search-inner">
                <div className="form-floating ">
                  <div className="input-group me-2 d-block custom-scroll">
                    <AsyncTypeahead
                      filterBy={() => true}
                      id="async-example"
                      isLoading={isLoading}
                      minLength={3}
                      labelKey="tradingSymbol"
                      onSearch={handleSearch}
                      options={options}
                      placeholder="Search for Instrument"
                      ref={typeaheadRef}
                      useCache={false}
                      debounceTime
                      renderMenuItemChildren={(option) => (
                        <>
                          <span>
                              <div className="h6 mb-0">
                                {option.tradingSymbol}
                                <p className="small text-muted mb-2">
                                  {option.formattedInsName}
                                </p>
                            </div>
                          </span>
                        </>
                      )}
                      onChange={(selected) => {
                        const value =
                          selected.length > 0 ? selected[0].formattedInsName : "";
                        const tradingSymbol =
                          selected.length > 0 ? selected[0].tradingSymbol : "";
                        const exchangeValue =
                          selected.length > 0 ? selected[0].exchange : "";
                        const tokenValue =
                          selected.length > 0 ? selected[0].token : "";
                        setValue(value);
                        setExchangeType(exchangeValue);
                        setToken(tokenValue);
                        setTradingSymbol(tradingSymbol);

                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <ul className="list-container" />
          </div>
          {/* <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">Trade Strategy </label>
            <input type="hidden" className="form-control" />
            <fieldset>
              <select
                className="array-select form-control form-select"
                aria-label="example"
                id="strategyId"
                name="strategyId"
                value={values.strategyId}
                onChange={handleChange}
              >
                <option>Select</option>
                {strategyData?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.strategyName}
                  </option>
                ))}
              </select>
            </fieldset>
          </div> */}
          {/* <ul></ul> */}
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label className="form-label">
              Quantity (Lot Size:1) <sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              className="form-control"
              value={values.lotSize}
              onChange={handleChange}
              id="lotSize"
              onBlur={handleBlur}
            />
            {errors.lotSize && touched.lotSize && (
              <p className="text-danger">{errors.lotSize}</p>
            )}
          </div>

          {values.targetProfit === "" &&
            values.tradeType.toLowerCase() !== "paper" && (
              <div className="col-lg-4 col-md-4 col-sm-12">
                <label className="form-label">Stop Loss Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.stopLossPrice}
                  onChange={handleChange}
                  id="stopLossPrice"
                  onBlur={handleBlur}
                  onInput={handleStopLoss}
                />
                {errors.stopLossPrice && touched.stopLossPrice && (
                  <p className="text-danger">{errors.stopLossPrice}</p>
                )}
              </div>
            )}
          {values.stopLossPrice === "" &&
            values.tradeType.toLowerCase() !== "paper" && (
              <div className="col-lg-4 col-md-4 col-sm-12">
                <label className="form-label">Trade Profit</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.targetProfit}
                  onChange={handleChange}
                  id="targetProfit"
                  onBlur={handleBlur}
                  onInput={handleTradeProfit}
                />
                {errors.targetProfit && touched.targetProfit && (
                  <p className="text-danger">{errors.targetProfit}</p>
                )}
              </div>
            )}

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default TradeInfoModal;
