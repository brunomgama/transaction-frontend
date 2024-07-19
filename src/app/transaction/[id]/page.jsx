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

        if (!accountId || !isDebit || !amount) {
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
                        Update transaction
                    </button>
                </form>
        )}
        </>
    );
};

export default TransactionForm;
