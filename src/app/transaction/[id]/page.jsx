'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUpdateTransaction from "../../../libs/transaction/useUpdateTransaction";
import useTransaction from "../../../libs/transaction/useTransaction";

const TransactionForm = ({ params }) => {
    const [accountId, setAccountId] = useState(0);
    const [isDebit, setDebit] = useState(true);
    const [amount, setAmount] = useState(0);

    const update = useUpdateTransaction();
    const router = useRouter();
    const paramId = params.id;

    const { data, isLoading, isSuccess} = useTransaction(paramId)

    useEffect(() => {
        if(isSuccess) {
            console.log(data)
            setAccountId(data.accountId)
            setDebit(data.isDebit)
            setAmount(data.amount)
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if(update.status === 'success') {
            router.push('/transaction');
            router.refresh();
        }
    }, [update.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accountId || amount <= 0 || isDebit === null || isDebit === undefined) {
            alert("Data is missing");
            return;
        }

        update.mutate({id: paramId, accountId, isDebit, amount})
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
                        onChange={(e) => setAccountId(e.target.value)}
                        value={accountId}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        type="number"
                        placeholder="Account ID"
                    />
                    <select
                        onChange={(e) => setDebit(e.target.value === 'true')}
                        value={isDebit}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                    >
                        <option value="true">Debit</option>
                        <option value="false">Credit</option>
                    </select>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        type="number"
                        placeholder="Amount"
                    />
                    <button type="submit" className="bg-debit rounded font-bold text-white py-3 px-6 w-fit">
                        Create Transaction
                    </button>
                </form>
            </div>
        )}
        </>
    );
};

export default TransactionForm;