'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateTransaction from "../../../libs/transaction/useCreateTransaction";

const TransactionForm = () => {
    const [accountId, setAccountId] = useState(0);
    const [isDebit, setDebit] = useState(true);
    const [amount, setAmount] = useState(0);

    const create = useCreateTransaction()
    const router = useRouter();

    useEffect(() => {
        if(create.status === 'success') {
            router.push('/transaction');
            router.refresh();
        }
    }, [create.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accountId || !isDebit || !amount) {
            alert("Data is missing");
            return;
        }

        create.mutate({accountId, isDebit, amount});
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setAccountId(e.target.value)}
                value={accountId}
                className="border border-slate-500 px-8 py-2"
                type="number"
                placeholder="Account"
            />
            <input
                onChange={(e) => setDebit(e.target.value)}
                value={isDebit}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Type"
            />
            <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="border border-slate-500 px-8 py-2"
                type="number"
                placeholder="Amount"
            />
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Create Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
