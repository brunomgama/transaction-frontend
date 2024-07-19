'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomer from "../../../libs/customer/useCustomer";
import useUpdateCustomer from "../../../libs/customer/useUpdateCustomer";

const CustomerForm = ({ params }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const update = useUpdateCustomer();
    const router = useRouter();
    const paramId = params.id;

    const { data, isLoading, isSuccess} = useCustomer(paramId)

    useEffect(() => {
        if(isSuccess) {
            console.log(data)
            setName(data.name)
            setSurname(data.surname)
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if(update.status === 'success') {
            router.push('/customer');
            router.refresh();
        }
    }, [update.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !surname) {
            alert("Name and surname are required");
            return;
        }

        update.mutate({id: paramId, name, surname})
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
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Bank Name"
                    />
                    <input
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        className="border border-slate-500 px-8 py-2"
                        type="text"
                        placeholder="Value"
                    />
                    <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                        Edit customer
                    </button>
                </form>
            )}
        </>
    );
};

export default CustomerForm;
