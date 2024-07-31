'use client'

import BankOverview from "@/app/component/bank_overview/bank_overview";
import LineGraph from "@/app/component/line_graph/line_graph";
import RadialGraph from "@/app/component/radial_graph/radial_graph";
import BarGraph from "@/app/component/bar_graph/bar_graph";
import {TbSquarePlus} from "react-icons/tb";
import {useRouter} from "next/navigation";
import ThemeSwitch from "@/app/ThemeSwitch";

export default function Home() {
    const router = useRouter();

    const handleAddClick = () => {
        router.push(`/transaction/create`);
    };

    return (
        <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-between items-center mt-4 ml-4 border-b-2 pb-4 border-light/[.06] dark:border-dark/[.06] mr-4">
                <span className="font-medium text-4xl text-light dark:text-dark">
                    Hello Bruno
                </span>
                <div className="flex">
                    <button
                        className="p-2 rounded border border-light dark:border-dark text-light dark:text-dark flex
                        items-center hover:bg-selected-light dark:hover:bg-selected-dark mr-8"
                        onClick={handleAddClick}>
                        <span>Add Transaction</span>
                    </button>

                    <ThemeSwitch/>
                </div>
            </div>
            <div className="flex-grow">
                <BankOverview/>
            </div>
            <div className="flex-grow">
                <BarGraph />
                {/*<LineGraph />*/}
                {/*<RadialGraph />*/}
            </div>
        </div>
    );
}
