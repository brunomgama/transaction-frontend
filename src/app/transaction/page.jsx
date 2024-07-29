import DataTransaction from "../component/data_transaction/data_transaction";
import columns from '../../enums/transaction/columns';

const Transaction = async () => {
    return (
        <div>
            <DataTransaction list={columns}/>
        </div>
    );
}

export default Transaction;