'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import useCustomerList from "@/libs/customer/useCustomerList";
import Loading from "../loading/loading";

const HandleOverview = () => {
    const [customerId, setCustomerId] = useState(0);
    const router = useRouter();

    const { data, isLoading } = useCustomerList();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(customerId !== 0) {
            router.push(`/overview/${customerId}`);
            router.refresh();
        }
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg"
                    >
                        <label htmlFor="customerId" className="block mt-2 text-sm font-medium text-light dark:text-dark">
                            Customer ID
                        </label>
                        <select
                            id="customerId"
                            className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                        >
                            <option value={0} disabled>Select Customer ID</option>
                            {data?.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.id} - {customer.name} {customer.surname}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                            Check Global Overview
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default HandleOverview;
