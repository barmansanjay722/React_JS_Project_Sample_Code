// import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import OrderHeader from "./OrderHeader/OrderHeader";
import OrderBody from "./OrderBody/OrderBody";
const Order = () => {
  return (
    <>
      {/* start: page toolbar */}
      {/* <BreadCrumbs /> */}
      {/* start : Page Header */}
      <OrderHeader />
      {/* start: page body */}
      <OrderBody />
    </>
  );
};
export default Order;
