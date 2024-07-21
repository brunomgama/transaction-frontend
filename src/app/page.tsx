import Card from "@/app/component/card/card";

export default function Home() {
    return (
        <div>
            <div className="flex justify-center">
                <Card label={"Account"} redirection={"/account/create"}/>
                <Card label={"Customer"} redirection={"/customer/create"}/>
                <Card label={"Transaction"} redirection={"/transaction/create"}/>
            </div>
        </div>
    );
}
