import * as yup from "yup";
let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

export const placeOrderForm = yup.object().shape({
  quantity: yup.number().min(1).required("Required"),
  tradeType: yup
    .string()
    .oneOf(["Live", "Paper"], "Invalid trade type")
    .required("Required"),
  productCode: yup
    .string()
    .oneOf(["MIS", "NORMAL", "CNC"], "Invalid order type")
    .required("Required"),
    transactionType: yup.string().required("Required"),
  triggerPrice: yup.number(),
  priceType: yup
    .string()
    .oneOf(["LIMIT", "MARKET"], "Invalid price type")
    .required("Required"),
  price: yup
  .number()
  .min(0)
  .test(
    "is-decimal",
    "The amount should be a decimal with maximum two digits after comma",
    (val) => {
      if (val !== undefined) {
        return patternTwoDigisAfterComma.test(val);
      }
      return true;
    }
  )
});
