import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import StrategyHeader from "./StrategyHeader/StrategyHeader";
import StrategyBody from "./StrategyBody/StrategyBody";
const Strategy = () => {
  return (
    <>
      {/* start: page toolbar */}
      <BreadCrumbs />
      {/* start : Page Header */}
      <StrategyHeader />
      {/* start: page body */}
      <StrategyBody />
      
    </>
  );
};
export default Strategy;
