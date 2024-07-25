'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUpdateAccount from "../../../libs/account/useUpdateAccount";
import useAccount from "../../../libs/account/useAccount";
import Loading from "../../component/loading/loading";

const AccountForm = ({ params }) => {
    const [customerId, setCustomerId] = useState(0);
    const [bankName, setBankName] = useState("");
    const [iban, setIban] = useState("");
    const [balance, setBalance] = useState(0);
    const [iconPath, setIconPath] = useState("");

    const update = useUpdateAccount();
    const router = useRouter();
    const paramId = params.id;

    const { data, isLoading, isSuccess} = useAccount(paramId)

    useEffect(() => {
        if(isSuccess) {
            setCustomerId(data.customerId)
            setBankName(data.bankName)
            setIban(data.iban)
            setBalance(data.balance)
            setIconPath(data.iconPath)
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if(update.status === 'success') {
            router.push('/account');
            router.refresh();
        }
    }, [update.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customerId) {
            alert("Customer Information is missing");
            return;
        } else if (!bankName) {
            alert("Bank name is missing");
            return;
        } else if (!iban) {
            alert("IBAN is missing");
            return;
        } else if (!balance) {
            alert("Balance Information is missing");
            return;
        } else if (!iconPath) {
            alert("Icon is missing");
            return;
        }

        update.mutate({id: paramId, bankName, iban, balance, customerId, iconPath});
    };

    return (
        <>
        {isLoading ? (
            <Loading />
        ) : (
            <>
                {isSuccess ? (
                    <div className="flex items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                            <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
                                ID</label>
                            <input
                                onChange={(e) => setCustomerId(e.target.value)}
                                value={customerId}
                                className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                type="number"
                            />
                            <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Bank
                                Name</label>
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => setBankName(e.target.value)}
                                    value={bankName}
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                    type="text"
                                    placeholder="None"
                                />
                            </div>
                            <label htmlFor="email"
                                   className="block mt-2 text-sm font-medium text-light dark:text-dark">IBAN</label>
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => setIban(e.target.value)}
                                    value={iban}
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                    type="text"
                                    placeholder="None"
                                />
                            </div>
                            <label htmlFor="email"
                                   className="block mt-2 text-sm font-medium text-light dark:text-dark">Balance</label>
                            <div className="relative w-full">
                                <div
                                    className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-light dark:text-dark" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor"
                                              d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setBalance(e.target.value)}
                                    value={balance}
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                    type="number"
                                    placeholder="None"
                                />
                            </div>
                            <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Icon
                                Path</label>
                            <select className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                    name="iconPath"
                                    value={iconPath}
                                    onChange={(e) => setIconPath(e.target.value)}
                            >
                                <option value="/resources/bank/bankinter.png">Bankinter</option>
                                <option value="/resources/bank/cgd.png">CGD</option>
                                <option value="/resources/bank/ctt.png">CTT</option>
                                <option value="/resources/bank/revolut.png">Revolut</option>
                            </select>
                            <button type="submit"
                                    className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                                Edit Account
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <p>Failed to load account data either it does not exist or there was a server error.</p>
                    </div>
                )}
            </>
        )}
        </>
    );
};

export default AccountForm;
