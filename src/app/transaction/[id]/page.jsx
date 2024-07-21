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
            <div role="status">
                <svg aria-hidden="true"
                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        ) : (
            <div className="flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                    <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Account
                        ID</label>
                    <input
                        onChange={(e) => setAccountId(e.target.value)}
                        value={accountId}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        type="number"
                        placeholder="Account ID"
                    />
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-light dark:text-dark">Type</label>
                    <select
                        onChange={(e) => setDebit(e.target.value === 'true')}
                        value={isDebit}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                    >
                        <option value="true">Debit</option>
                        <option value="false">Credit</option>
                    </select>
                    <label htmlFor="email"
                           className="block mt-2 text-sm font-medium text-light dark:text-dark">Amount</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-light dark:text-dark" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                            </svg>
                        </div>
                        <input onChange={(e) => setAmount(e.target.value)}
                               value={amount}
                               type="number" id="currency-input"
                               className="block p-2.5 w-full z-20 ps-10 text-light dark:text-dark"
                               placeholder="Enter amount" required/>
                    </div>
                    <button type="submit"
                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                        Edit Transaction
                    </button>
                </form>
            </div>
        )}
        </>
    );
};

export default TransactionForm;
