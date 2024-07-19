'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUpdateAccount from "../../../libs/account/useUpdateAccount";
import useAccount from "../../../libs/account/useAccount";

const AccountForm = ({ params }) => {
    const [customerId, setCustomerId] = useState(0);
    const [balance, setBalance] = useState(0);

    const update = useUpdateAccount();
    const router = useRouter();
    const paramId = params.id;

    const { data, isLoading, isSuccess} = useAccount(paramId)

    useEffect(() => {
        if(isSuccess) {
            setCustomerId(data.customerId)
            setBalance(data.balance)
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

        if (!customerId || !balance) {
            alert("Data is not fully filled.");
            return;
        }

        update.mutate({id: paramId, customerId, balance});
    };

    return (
        <>
        {isLoading ? (
                <div>
                    Loading
                </div>
            ) : (
            <div className="flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                    <input
                        onChange={(e) => setCustomerId(e.target.value)}
                        value={customerId}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        type="number"
                        placeholder="Customer ID"
                    />
                    <input
                        onChange={(e) => setBalance(e.target.value)}
                        value={balance}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        type="number"
                        placeholder="Balance"
                    />
                    <button type="submit" className="bg-debit rounded font-bold text-white py-3 px-6 w-fit">
                        Create Account
                    </button>
                </form>
            </div>
        )}
        </>
    );
};

export default AccountForm;