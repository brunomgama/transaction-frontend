import DataTransaction from "../component/data_transaction/data_transaction";

const columns = [
    {
        label: "ID",
    },
    {
        label: "Account ID",
    },
    {
        label: "Type",
    },
    {
        label: "Amount",
    },
    {
        label: "Actions",
    }
];

const Transaction = async () => {
    return (
        <div>
            <DataTransaction list={columns}/>
        </div>
    );
}

export default Transaction;