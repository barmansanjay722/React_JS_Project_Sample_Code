import { useSelector } from "react-redux";
import { successToast } from "../../Toasts/Toasts";
import { getRenewalHistory,getRenewalHistoryInvoice } from "../../../services/profileService";
const RenewalHistory = () => {
  const userId = useSelector((state) => state.auth.customerId);
  const {data} = getRenewalHistory({userId});
  const record = data?.result;
  

  console.log(record);

  const Invoice = async (item) => {
    try {
        // backend api call for get request
        const response = await getRenewalHistoryInvoice(item?.subscriptionTransactionId);
        const name = "Invoice";
        if (response.status === 200) {
            successToast("Invoice downloaded");
            const blob = new Blob([response.data], { type: 'application/pdf; charset=utf-8' });
            // console.log("RESPONSE BLOB: ", blob);
            const url= URL.createObjectURL(blob);
            // window.open(url);
            // console.log("----->",url);
            let alink = document.createElement('a');
                alink.href = url;
                alink.download = name;
                alink.click(); 
              
           
            
        }
    } catch (error) {
        return error;
    }
};
  return (
    <>
    {record!==null && 
      <div className="col-lg-7" >
        <div className="card">
          <div className="card-body renewal-history">
            <h6 className="card-title mb-3">Renewal History</h6>
            <table
              id="myDataTable"
              style={{ width: "100%", borderSpacing: "0 !important" }}
              className="myDataTable table align-middle table-bordered mb-0 mt-3 dataTable custom-table-2"
            >
              <thead>
                <tr>
                  <th className="border-top-0">Date</th>
                  {/* <th width="50%">Type</th> */}
                  <th className="border-top-0">Amount</th>
                  <th className="border-top-0">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {
                 record?.map((item,index)=>(
                  <tr key={index}>
                  <td className="dt-body-left">{item?.date}</td>
                  {/* <td className="dt-body-left">Free</td> */}
                  <td>₹ {item?.amount}
                  </td>
                  <td className="dt-body-left text-primary" onClick={(e) => Invoice(item)} style={{cursor:"pointer"}}>
                      <i className="fa fa-download" /> Download
                  </td>
                </tr>
                 ))
                }
                
                
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
}
    </>
  );
};
export default RenewalHistory;
