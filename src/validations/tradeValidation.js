import * as yup from "yup";
export const tradeSetupForm = yup.object().shape({
  orderType: yup
    .string()
    .oneOf(["MIS", "Normal", "CNC"], "Invalid order type")
    .required("Required"),

  tradeType: yup
    .string()
    .oneOf(["Live", "Paper"], "Invalid trade type")
    .required("Required"),

  lotSize: yup.number().typeError('Integer only').min(1, "Minimum one").required("Required"),

  stockType: yup
    .string()
    .oneOf(["Stock", "Options", "Futures"], "Invalid stock type")
    .required("Required"),

  exchange: yup
    .string()
    .oneOf(["NSE", "BSE"], "Invalid exchange")
    .required("Required"),
    
});
