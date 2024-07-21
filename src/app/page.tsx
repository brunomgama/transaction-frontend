import Card from "@/app/component/card/card";
import HandleOverview from "@/app/component/handle_overview/handle_overview";

export default function Home() {
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
