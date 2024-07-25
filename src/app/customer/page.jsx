import DataCustomer from "../component/data_customer/data_customer"

const columns = [
    {
        label: "Profile",
    },
    {
        label: "Name",
    },
    {
        label: "Surname",
    },
    {
        label: "Actions",
    },
];

const Customer = async () => {
    return (
        <div>
            <DataCustomer list={columns}/>
        </div>
    );
}

export default Customer;