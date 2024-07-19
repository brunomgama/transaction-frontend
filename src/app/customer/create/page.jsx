'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateCustomer from "../../../libs/customer/useCreateCustomer";

const CustomerForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const create = useCreateCustomer()
    const router = useRouter();

    useEffect(() => {
        if(create.status === 'success') {
            router.push('/customer');
            router.refresh();
        }
    }, [create.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !surname) {
            alert("Name and surname are required");
            return;
        }

        create.mutate({name, surname});
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer Name"
            />
            <input
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer Surname"
            />
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Add Customer
            </button>
        </form>
    );
};

export default CustomerForm;
