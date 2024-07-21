'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateAccount from "../../../libs/account/useCreateAccount";
import useCustomerList from "../../../libs/customer/useCustomerList";

const AccountForm = () => {
    const [customerId, setCustomerId] = useState(0);
    const [balance, setBalance] = useState(0);

    const create = useCreateAccount();
    const router = useRouter();

    const { data, isLoading } = useCustomerList();

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

        if (!customerId) {
            alert("Customer is missing.");
            return;
        }

        create.mutate({ customerId, balance });
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
                    ID</label>
                <select id="customerId" className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                        value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                    <option value={0} disabled>Select Customer ID</option>
                    {data?.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.id} - {customer.name} {customer.surname}
                        </option>
                    ))}
                </select>
                <label htmlFor="email"
                       className="block mt-2 text-sm font-medium text-light dark:text-dark">Balance</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-light dark:text-dark" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                            </svg>
                        </div>
                        <input onChange={(e) => setBalance(e.target.value)}
                                type="number" id="currency-input"
                               className="block p-2.5 w-full z-20 ps-10 text-light dark:text-dark"
                               placeholder="Enter amount" required/>
                    </div>
                <button type="submit"
                        className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default AccountForm;
