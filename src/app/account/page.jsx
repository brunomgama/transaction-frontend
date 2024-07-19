import DataAccount from "../component/data_account/data_account";

const columns = [
    {
        label: "Account Id",
    },
    {
        label: "Customer Id",
    },
    {
        label: "Balance",
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