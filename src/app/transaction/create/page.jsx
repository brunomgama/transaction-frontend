'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateTransaction from "../../../libs/transaction/useCreateTransaction";
import useCustomerList from "../../../libs/customer/useCustomerList";
import useAccountFilteredList from "../../../libs/account/useAccountFilterList";
import transaction_types from "../../../enums/transaction/types"
import category from "../../../enums/transaction/category"
import in_out from "../../../enums/transaction/in_out";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionForm = () => {
    const [destination, setDestination] = useState("");
    const [accountId, setAccountId] = useState(0);
    const [transaction_type, setTransactionType] = useState(0);
    const [transaction_category, setTransactionCategory] = useState(0);
    const [state, setState] = useState(true);
    const [isDebit, setDebit] = useState(true);
    const [amount, setAmount] = useState(0);
    const [repetition, setRepetition] = useState(false);
    const [customerId, setCustomerId] = useState(1);
    const [incomingDate, setIncomingDate] = useState(null);

    const create = useCreateTransaction();
    const router = useRouter();

    const { data: customers, isLoading: isLoadingCustomers } = useCustomerList();
    const { data: accounts, isLoading: isLoadingAccounts } = useAccountFilteredList(customerId);

    useEffect(() => {
        if (create.status === 'success') {
            router.push('/transaction');
            router.refresh();
        } else if (create.status === 'error') {
            alert("Customer does not exist");
        }
    }, [create.status, router]);

    const goBack = () => {
        router.push(`/transaction`);
        router.refresh();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accountId || !amount) {
            alert("Data is missing");
            return;
        }

        create.mutate({ destination, accountId, transaction_type, transaction_category, state, isDebit, amount, repetition, incomingDate });
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                <label htmlFor="destination"
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

                <label htmlFor="accountId" className="block mt-2 text-sm font-medium text-light dark:text-dark">Account
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
                            {acc.bankName}
                        </option>
                    ))}
                </select>

                <label htmlFor="transactionType" className="block mb-2 text-sm font-medium text-light dark:text-dark">Type</label>
                <div className="flex gap-4">
                    {transaction_types.map((type) => (
                        <div
                            key={type.value}
                            onClick={() => setTransactionType(type.value)}
                            className={`cursor-pointer p-4 rounded-lg text-white ${transaction_type === type.value ? 'bg-selected-light dark:bg-selected-dark' : ''} 
                            bg-light dark:bg-dark transition-all hover:opacity-80`}
                        >
                            {type.label}
                        </div>
                    ))}
                </div>

                <label htmlFor="transactionCategory"
                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Category</label>
                <select
                    id="transactionCategory"
                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                    value={transaction_category}
                    onChange={(e) => setTransactionCategory(Number(e.target.value))}
                >
                    <option value={0} disabled>Select Category</option>
                    {category.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="type"
                       className="block mb-2 text-sm font-medium text-light dark:text-dark">In/Out</label>
                <div className="flex gap-4">
                    {in_out.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => setDebit(option.value)}
                            className={`cursor-pointer p-4 rounded-lg text-white ${isDebit === option.value ? 'bg-selected-light dark:bg-selected-dark' : ''} 
                            bg-light dark:bg-dark transition-all hover:opacity-80`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>

                <label htmlFor="amount"
                       className="block mb-2 text-sm font-medium text-light dark:text-dark">Amount</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-light dark:text-dark" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor"
                                  d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setAmount(Number(e.target.value))}
                        value={amount}
                        className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                        type="number"
                        placeholder="None"
                    />
                </div>

                <div className="flex flex-col items-start ps-4 mt-2 mb-2">
                    <label className="inline-flex items-center cursor-pointer mb-2">
                        <input
                            type="checkbox"
                            value=""
                            checked={state}
                            onChange={(e) => setState(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-selected-light dark:peer-focus:ring-selected-dark rounded-full peer dark:bg-gray-700
                            peer-checked:bg-selected-light dark:peer-checked:bg-selected-dark peer-checked:after:translate-x-full
                            rtl:peer-checked:after:-translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                        ></div>

                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Paid</span>
                    </label>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            checked={repetition}
                            onChange={(e) => setRepetition(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-selected-light dark:peer-focus:ring-selected-dark rounded-full peer dark:bg-gray-700
                            peer-checked:bg-selected-light dark:peer-checked:bg-selected-dark peer-checked:after:translate-x-full
                            rtl:peer-checked:after:-translate-x-full
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                        ></div>

                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Repetition</span>
                    </label>
                </div>

                {!state && (
                    <div>
                        <label htmlFor="repeatDate" className="block mb-2 text-sm font-medium text-light dark:text-dark">Date of transaction</label>
                        <DatePicker
                            id="repeatDate"
                            selected={incomingDate}
                            onChange={(date) => setIncomingDate(date)}
                            className="border border-slate-500 px-8 py-2 text-light dark:text-dark w-full"
                            placeholderText="Select date"
                        />
                    </div>
                )}

                <div className="flex justify-between">
                    <button type="submit"
                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                        Create Transaction
                    </button>

                    <button onClick={goBack} type="button"
                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                        Cancel Transaction
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransactionForm;
