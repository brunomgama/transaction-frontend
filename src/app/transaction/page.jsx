import DataTransaction from "../component/data_transaction/data_transaction";

const columns = [
    {
        label: "ID",
    },
    {
        label: "Destination",
    },
    {
        label: "Account Id",
    },
    {
        label: "Type",
    },
    {
        label: "Category",
    },
    {
        label: "State",
    },
    {
        label: "In/Out",
    },
    {
        label: "Amount",
    },
    {
        label: "Repetition",
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