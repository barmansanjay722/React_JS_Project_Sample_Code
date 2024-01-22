import CustomerTable from "./CustomerTable";
const CustomerBody = () => {
    return (
        <>
            <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1 mt-1">
                <div className="container-fluid">
                    <div className="row g-2 mb-5">
                        <div className="col-12">
                            <div className="card">
                                <CustomerTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CustomerBody;
