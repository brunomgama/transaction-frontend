'use client'

import { TbGlobe, TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useCustomerList from "../../../libs/customer/useCustomerList";
import useDeleteCustomer from "../../../libs/customer/useDeleteCustomer";
import Loading from "../loading/loading";

const DataCustomer = ({ list }) => {
    const router = useRouter();
    const deleteCustomer = useDeleteCustomer()

    const { data, isLoading } = useCustomerList()

    const handleOverviewClick = (id) => {
        router.push(`/overview/${id}`);
    };

    const handleEditClick = (id) => {
        router.push(`/customer/${id}`);
    };

    const handleAddClick = () => {
        router.push(`/customer/create`);
    };

    const handleDeleteClick = (id) => {
        deleteCustomer.mutate(id)
    };

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-end items-center mb-4">
                <button
                    className="p-2 rounded border border-light dark:border-dark text-light dark:text-dark flex items-center hover:bg-selected-light dark:hover:bg-selected-dark"
                    onClick={handleAddClick}>
                    <span>Add Customer</span>
                    <TbSquarePlus className="text-xl ml-2" />
                </button>
            </div>
            {isLoading? (
                <Loading />
            ) : (
                <table className="w-full text-sm text-light dark:text-dark">
                    <thead className="text-xs uppercase bg-over-light dark:bg-over-dark text-light dark:text-dark">
                    <tr>
                        {list.map((t) => (
                            <th key={t.label} scope="col" className="px-6 py-3 text-left">
                                {t.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((t) => (
                        <tr key={t.id}
                            className="bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                            <th scope="row" className="px-6">
                                <img className="w-10 h-10 rounded-xl" src="/resources/customer/profile.png" alt="Default avatar"/>
                            </th>
                            <td className="px-6 py-4 text-left">
                                {t.name}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.surname}
                            </td>
                            <td className="py-4 text-left">
                                <div className="flex">
                                    <div className="flex">
                                        <button
                                            className="p-2 rounded mx-4 bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark"
                                            onClick={() => handleOverviewClick(t.id)}>
                                            <TbGlobe className="text-xl"/>
                                        </button>
                                        <button
                                            className="p-2 rounded mx-4 bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark"
                                            onClick={() => handleEditClick(t.id)}>
                                            <TbEdit className="text-xl"/>
                                        </button>
                                        <button
                                            className="p-2 rounded bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark"
                                            onClick={() => handleDeleteClick(t.id)}>
                                            <TbCreditCardOff className="text-xl"/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DataCustomer;