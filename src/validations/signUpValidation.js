import * as yup from "yup";

const phoneRegExp = /^([6-9][0-9]{9})$/;
const emailPhoneRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const basicSchema = yup.object().shape({
  email: yup.string().matches(emailRegex, "Invalid email format").required("Required"),
  firstName: yup
    .string()
    .min(1, "Name is invalid")
    .max(64, "First name must be at most 64 characters long")
    .matches(nameRegex, "Invalid Name")
    .required("Required"),
  lastName: yup
    .string()
    .min(1, "Name is invalid")
    .max(64, "Last name must be at most 64 characters long")
    .matches(nameRegex, "Invalid Name")
    .required("Required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

export const userCheck = yup.object().shape({
  username: yup
    .string()
    .matches(emailPhoneRegex, "Email address is not valid")
    .required("Email is required"),
});
export const emailCheck = yup.object().shape({
  email: yup
    .string()
    .matches(emailPhoneRegex, "Email address is not valid")
    .required("Email is required"),
});

export const GstInformationCheck = yup.object().shape({
  companyName: yup.string().required("required"),

  gstIn: yup.string().required("Gst Number is required"),

  address: yup.string().max(490).required("required"),
});

export const addStrategyCheck = yup.object().shape({
  name: yup.string().required("Required"),
  script: yup.string().max(4096).required("Required"),
});

export const brokerLoginCheck = yup.object({
  email: yup
    .string()
    .email("Enter valid Email")
    .required("This field is Required"),
  
});