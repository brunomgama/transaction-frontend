'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateAccount from "../../../libs/account/useCreateAccount";

const AccountForm = () => {
    const [customerId, setCustomerId] = useState(0);
    const [balance, setBalance] = useState(0);

    const create = useCreateAccount();
    const router = useRouter();

    useEffect(() => {
        if (create.status === 'success') {
            router.push('/account');
            router.refresh();
        }
    }, [create.status]);

    useEffect(() => {
        if (create.status === 'error') {
            alert("Customer does not exist");
        }
    }, [create.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customerId || !balance) {
            alert("Data is not fully filled.");
            return;
        }

        create.mutate({ customerId, balance });
    };

    return (
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
    );
};

export default AccountForm;
