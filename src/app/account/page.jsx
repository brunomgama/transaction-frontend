import DataAccount from "../component/data_account/data_account";

const columns = [
    {
        label: "Logo",
    },
    {
        label: "Bank",
    },
    {
        label: "IBAN",
    },
    {
        label: "Balance",
    },
    {
        label: "Customer Id",
    },
    {
        label: "Actions",
    },
];

const Account = async () => {
    return (
        <div>
            <DataAccount list={columns}/>
        </div>
    );
}

export default Account;