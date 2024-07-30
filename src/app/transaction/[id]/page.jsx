'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUpdateTransaction from "../../../libs/transaction/useUpdateTransaction";
import useTransaction from "../../../libs/transaction/useTransaction";
import Loading from "../../component/loading/loading";
import useCustomerList from "../../../libs/customer/useCustomerList";
import useAccountFilteredList from "../../../libs/account/useAccountFilterList";
import useAccount from "../../../libs/account/useAccount";
import transaction_types from "../../../enums/transaction/types"
import category from "../../../enums/transaction/category"

const TransactionForm = ({ params }) => {
    const [destination, setDestination] = useState("");
    const [accountId, setAccountId] = useState(0);
    const [transaction_type, setTransactionType] = useState(0);
    const [transaction_category, setTransactionCategory] = useState(0);
    const [state, setState] = useState(true);
    const [isDebit, setDebit] = useState(true);
    const [amount, setAmount] = useState(0);
    const [repetition, setRepetition] = useState(true);
    const [customerId, setCustomerId] = useState(0);

    const update = useUpdateTransaction();
    const router = useRouter();
    const paramId = params.id;

    const { data: transactionData, isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } = useTransaction(paramId);
    const { data: customers, isLoading: isLoadingCustomers } = useCustomerList();
    const { data: accounts, isLoading: isLoadingAccounts } = useAccountFilteredList(customerId);
    const { data: accountData, isLoading: isAccountLoading, isSuccess: isAccountSuccess } = useAccount(transactionData?.accountId);

    useEffect(() => {
        if (isTransactionSuccess) {
            setDestination(transactionData.destination);
            setAccountId(transactionData.accountId);
            setTransactionType(transactionData.transactionType);
            setTransactionCategory(transactionData.transactionCategory);
            setState(transactionData.state)
            setDebit(transactionData.isDebit);
            setAmount(transactionData.amount);
            setRepetition(transactionData.repetition)
        }
    }, [transactionData, isTransactionSuccess]);

    useEffect(() => {
        if (isAccountSuccess) {
            setCustomerId(accountData.customerId);
        }
    }, [accountData, isAccountSuccess]);

    useEffect(() => {
        if (update.status === 'success') {
            router.push('/transaction');
            router.refresh();
        } else if (update.status === 'error') {
            alert("Customer does not exist");
        }
    }, [update.status]);

    const goBack = () => {
        router.push(`/transaction`);
        router.refresh();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accountId || amount <= 0 || isDebit === null || isDebit === undefined) {
            alert("Data is missing");
            return;
        }

        update.mutate({id: paramId, destination, accountId, transaction_type, transaction_category, state, isDebit, amount, repetition});
    };

    return (
        <>
            {isTransactionLoading || isAccountLoading || isLoadingCustomers || isLoadingAccounts ? (
                <Loading />
            ) : (
                <>
                    {isTransactionSuccess && isAccountSuccess ? (
                        <div className="flex items-center justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                                <label htmlFor="amount"
                                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Destination</label>
                                <div className="relative w-full">
                                    <input
                                        onChange={(e) => setDestination(e.target.value)}
                                        value={destination}
                                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                        type="text"
                                        placeholder="None"
                                    />
                                </div>
                                <label htmlFor="customerId"
                                       className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
                                    ID</label>
                                <select
                                    id="customerId"
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                >
                                    <option value={0} disabled>Select Customer ID</option>
                                    {customers?.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} {customer.surname}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="accountId"
                                       className="block mt-2 text-sm font-medium text-light dark:text-dark">Account
                                    ID</label>
                                <select
                                    id="accountId"
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                    value={accountId}
                                    onChange={(e) => setAccountId(e.target.value)}
                                >
                                    <option value={0} disabled>Select Account ID</option>
                                    {accounts?.map((acc) => (
                                        <option key={acc.accountId} value={acc.accountId}>
                                            {acc.accountId}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="amount"
                                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Type</label>
                                <select
                                    id="transactionType"
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                    value={transaction_type}
                                    onChange={(e) => setTransactionType(Number(e.target.value))}
                                >
                                    {transaction_types.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="amount"
                                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Category</label>
                                <select
                                    id="transactionType"
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                    value={transaction_category}
                                    onChange={(e) => setTransactionCategory(Number(e.target.value))}
                                >
                                    {category.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="type"
                                       className="block mb-2 text-sm font-medium text-light dark:text-dark">In/Out</label>
                                <select
                                    id="type"
                                    onChange={(e) => setDebit(e.target.value === 'true')}
                                    value={isDebit}
                                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                                >
                                    <option value="true">Debit</option>
                                    <option value="false">Credit</option>
                                </select>
                                <label htmlFor="amount"
                                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Amount</label>
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
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                                        type="number"
                                        placeholder="None"
                                    />
                                </div>
                                <div
                                    className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox"
                                           checked={state}
                                           onChange={(e) => setState(e.target.checked)}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="bordered-checkbox-1"
                                           className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Paid</label>
                                    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox"
                                           checked={repetition}
                                           onChange={(e) => setRepetition(e.target.checked)}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="bordered-checkbox-1"
                                           className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repetition</label>
                                </div>
                                <div className="flex justify-between">
                                    <button type="submit"
                                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                                        Edit Transaction
                                    </button>

                                    <button onClick={goBack} type="button"
                                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                                        Cancel Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p>Failed to load transaction data either it does not exist or there was a server error.</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default TransactionForm;
