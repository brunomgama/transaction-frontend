import Card from "../component/card/card";
import HandleOverview from "../component/handle_overview/handle_overview";

const Actions = async () => {
    return (
        <div>
            <div className="flex justify-center">
                <Card label={"Account"} redirection={"/account/create"}/>
                <Card label={"Customer"} redirection={"/customer/create"}/>
                <Card label={"Transaction"} redirection={"/transaction/create"}/>
            </div>
            <div>
                <HandleOverview/>
            </div>
        </div>
    );
}

export default Actions;