/*import WatchListHeader from "./WatchListHeader/WatchListHeader";*/
// import { useState } from "react";
// import WatchListTable from "./WatchListTable/WatchListTable";
// import SaveWatchListModal from "../../../Modal/SaveWatchListModal";
// import EditWatchListModal from "../../../Modal/EditWatchListModal";

// const WatchList = () => {
//   let [isModal, setIsModal] = useState(false);
//   let [isModalOpen,setIsModalOpen] = useState(false);
  
  
//   const handleShowSaveWatchList = () => {
//     setIsModal(true);
//   };

//   const HideSaveWatchList = () => {
//     setIsModal(false);
//   };
  
//   const handleShowEditWatchList=()=>{
//     setIsModalOpen(true);
//   }

//   const HideEditWatchList=()=>{
//     setIsModalOpen(false);
//   }
//   return (
//     <>
//       <div className="row g-2 mb-5 mt-2">
//         <div className="col-12">
//           <div className="card">
//             <div className="card-body py-3">
//               <div className="row">
//                 <div className="col-md-8 d-flex">
//                   <h6 className="card-title mb-2 pt-2">My Watchlist</h6>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="d-flex">
//                     <div className="input-group me-2">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search..."
//                         aria-label="property-search"
//                         aria-describedby="propertySearch"
                       
//                         name="search"
//                       />
//                       <span className="input-group-text" id="propertySearch">
//                         <i className="fa fa-search" />
//                       </span>
//                     </div>

//                     <div className="input-group">
//                       <button
//                         className="btn btn-outline-secondary"
//                         type="button"
//                         onClick={() => {
//                           handleShowEditWatchList();
//                         }}
//                       >
//                         <i className="fa fa-edit" />
//                         <span className="d-none d-md-inline-block ms-2">
//                           Edit
//                         </span>
//                       </button>    
//                       <button
//                         className="btn btn-outline-secondary"
//                         type="button"
//                         onClick={() => {
//                           handleShowSaveWatchList();
//                         }}
//                       >
//                         <i className="fa fa-plus" />
//                         <span className="d-none d-md-inline-block ms-2">
//                           Add
//                         </span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body border-top">
//               <WatchListTable />
//             </div>
//             <SaveWatchListModal
//               showSaveWatchListModal={isModal}
//               handleSaveWatchListModalClose={HideSaveWatchList}
//             />
//             <EditWatchListModal
//               showEditWatchListModal={isModalOpen}
//               handleEditWatchListModalClose={HideEditWatchList}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default WatchList;