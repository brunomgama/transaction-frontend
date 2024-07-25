'use client'

import useAccountList from "../../../libs/account/useAccountList";
import Loading from "@/app/component/loading/loading";
import {useRouter} from "next/navigation";

const BankOverview = () => {
    const router = useRouter();
    const { data, isLoading } = useAccountList()

    return (
        <div className="flex overflow-x-auto">
            {isLoading?(
                <div>
                    <Loading />
                </div>
                ) : (
                <div>
                    {data.map((t) => (
                        <div key={t.id} className="w-72 flex-none cursor-pointer flex flex-col m-4 rounded-xl p-4
                         bg-over-light dark:bg-over-dark hover:bg-selected-light dark:hover:bg-selected-dark transition duration-300">
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-xl" src={t.iconPath} alt="Default avatar"/>
                                <span className="font-medium text-2xl mt-4 ml-4 text-light dark:text-dark">
                                    {t.bankName}
                                </span>
                            </div>
                            <div className="flex flex-col gap-4 text-light dark:text-dark">
                                <span className="font-small text-xl mt-2">{t.balance} €</span>
                                <span className="font-small text-base mb-4">
                                    <span className="text-teal-500">
                                        12%
                                    </span>
                                    amount more than previous month
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BankOverview;
