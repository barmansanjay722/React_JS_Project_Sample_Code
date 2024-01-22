import CustomerHeader from "./CustomerHeader/CustomerHeader";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CustomerBody from "./CustomerBody/CustomerBody";
const Customer = () => {
  return (
    <>
       {/* start: page toolbar */}
       <BreadCrumbs />
      {/* start : Page Header */}
      <CustomerHeader />
      {/* start: page body */}
      <CustomerBody/>
    </>
  );
};
export default Customer;
