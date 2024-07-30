import DataCustomer from "../component/data_customer/data_customer"
import columns from "../../enums/customer/columns";

//TODO: IF CUSTOMER DOES NOT EXIST THEN ADD BLACK ICON
//TODO: CHANGE DATA MODEL SO THAT USER CAN HAVE PHOTO UPLOADED ??? LATE IMPLEMENTATION

const Customer = async () => {
    return (
        <div>
            <DataCustomer list={columns}/>
        </div>
    );
}

export default Customer;