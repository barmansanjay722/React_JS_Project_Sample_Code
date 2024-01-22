import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import PositionHeader from "./PositionHeader/PositionHeader";
import PositionBody from "./PositionBody/PositionBody";
const Position = () => {
  return (
    <>
      {/* start: page toolbar */}
      {/* <BreadCrumbs /> */}
      {/* start : Page Header */}
      <PositionHeader />
      {/* start: page body */}
      <PositionBody />
    </>
  );
};
export default Position;
