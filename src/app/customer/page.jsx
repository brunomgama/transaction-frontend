import DataCustomer from "../component/data_customer/data_customer"
import columns from "../../enums/customer/columns";

const Customer = async () => {
    return (
        <div>
            <DataCustomer list={columns}/>
        </div>
    );
}

export default Customer;