'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCreateCustomer from "../../../libs/customer/useCreateCustomer";

//TODO: CHANGE THE BUTTONS TO BE MORE EASILY CLEAR

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

    const goBack = () => {
        router.push(`/customer`);
        router.refresh();
    }

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full mx-auto p-6 bg-gray-700 bg-opacity-50 rounded-lg">
                <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
                    Name</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                    type="text"
                    placeholder="None"
                />
                <label htmlFor="email" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer
                    Surname</label>
                <input
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    className="border border-slate-500 px-8 py-2 text-light dark:text-dark"
                    type="text"
                    placeholder="None"
                />
                <div className="flex justify-between">
                    <button type="submit"
                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                        Create Customer
                    </button>

                    <button onClick={goBack} type="button"
                            className="bg-selected-light dark:bg-selected-dark rounded font-bold text-white py-3 px-6 w-fit">
                        Cancel Creation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
