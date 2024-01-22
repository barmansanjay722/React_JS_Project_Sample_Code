import { getBrokers } from '../../../services/brokerService'
import {Link } from "react-router-dom";
import { useState } from 'react';
const SignInAliceBlueBtn=()=>{
  const [limit] = useState(3);
  const [offset] = useState(0);

  const  { data }= getBrokers(limit,offset);
 
    return(
       <>
          <div className="row justify-content-center">
              <div className="row broker-list mb-4">
              {
                data?.map((item,index)=>(
                  <div className="col-lg-4 col-md-4 col-sm-6 col-6 mb-2" key={index}>
                  <Link to={item?.authUrl} className="card active p-2 text-primary">
                    <div className="card-body text-center p-1 py-1">
                      <img src={item?.logo} alt="Alogotic" style={{width: '100%', position: 'relative', left: '50%', transform: 'translateX(-34%)'}} />
                    </div>
                  </Link>
                </div>
                ))
              }
                
               
              </div>
          </div>
                 
       </>
    );
}
export default SignInAliceBlueBtn