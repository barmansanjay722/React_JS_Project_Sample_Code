import * as yup from "yup";
const emailPhoneRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  export const loginCheck = yup.object().shape({
    username: yup
      .string()
      .matches(emailPhoneRegex, "Email address is not valid")
      .required("Email is required"),

      password : yup
     .string()
     .required("required")

  });
  