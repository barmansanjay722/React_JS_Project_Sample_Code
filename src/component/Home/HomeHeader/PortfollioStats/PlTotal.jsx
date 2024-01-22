const PlTotal = ({ title,icon,portfollioData,ruppeeicon,colorChange}) => {
  return (
    
      <>
      <div className="card mb-3">
            <div className="card-body d-flex align-items-start p-lg-3 p-2">
              <div className="flex-fill">
                <div className="fw-bold pb-2">
                  <span className={colorChange} >
                  {ruppeeicon}<strong>
                   {portfollioData !=null ? (portfollioData) : "0"}
                    </strong>
                  
                  </span>
                </div>
                <div className="text-muted mb-2 text-uppercase">
                  {title}
                </div>
              </div>
              <div className="avatar lg rounded-circle no-thumbnail text-light bg-light">
              <i className={icon}></i>
              </div>
            </div>
      </div>
      
    </>
  );
};
export default PlTotal;
