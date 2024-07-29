import DataAccount from "../component/data_account/data_account";
import columns from "../../enums/account/columns";

const Account = async () => {
    return (
        <div>
            <DataAccount list={columns}/>
        </div>
    );
}

export default Account;