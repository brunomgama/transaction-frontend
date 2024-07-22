'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateTransaction from "../../../libs/transaction/useCreateTransaction";
import useCustomerList from "../../../libs/customer/useCustomerList";
import useAccountFilteredList from "../../../libs/account/useAccountFilterList";

const TransactionForm = () => {
    const [accountId, setAccountId] = useState(0);
    const [isDebit, setDebit] = useState(true);
    const [amount, setAmount] = useState(0);
    const [customerId, setCustomerId] = useState(0);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accountId || !amount) {
            alert("Data is missing");
            return;
        }

        create.mutate({ accountId, isDebit, amount });
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                <label htmlFor="customerId" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
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
                            {customer.id} - {customer.name} {customer.surname}
                        </option>
                    ))}
                </select>
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
                            {acc.accountId}
                        </option>
                    ))}
                </select>

                <label htmlFor="type" className="block mb-2 text-sm font-medium text-light dark:text-dark">Type</label>
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
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
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
                <button type="submit"
                        className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                    Create Transaction
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
