'use client'

import { TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useDeleteAccount from "../../../libs/account/useDeleteAccount";
import useAccountList from "../../../libs/account/useAccountList";

const DataAccount = ({ list }) => {
    const router = useRouter();
    const deleteAccount = useDeleteAccount()

    const { data, isLoading } = useAccountList()

    const handleEditClick = (id) => {
        router.push(`/account/${id}`);
    };

    const handleAddClick = () => {
        router.push(`/account/create`);
    };

    const handleDeleteClick = (id) => {
        deleteAccount.mutate(id)
    };

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-end items-center mb-4">
                <button
                    className="p-2 rounded border border-light dark:border-dark text-light dark:text-dark flex items-center hover:bg-selected-light dark:hover:bg-selected-dark"
                    onClick={handleAddClick}>
                    <span>Add Account</span>
                    <TbSquarePlus className="text-xl ml-2" />
                </button>
            </div>
            {isLoading?(
                <div>
                    Loading
                </div>
            ): (
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
                    <tr key={t.accountId}
                        className="bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap text-left">
                            <div className="flex">
                                {t.accountId}
                            </div>
                        </th>
                        <td className="px-6 py-4 text-left">
                            {t.customerId}
                        </td>
                        <td className="px-6 py-4 text-left">
                            {t.balance}
                        </td>
                        <td className="py-4 text-left">
                            <div className="flex">
                                <button
                                    className="p-2 rounded mx-4 bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                                    <TbEdit className="text-xl" onClick={() => handleEditClick(t.accountId)}/>
                                </button>
                                <button
                                    className="p-2 rounded bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                                    <TbCreditCardOff className="text-xl" onClick={() => handleDeleteClick(t.accountId)}/>
                                </button>
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

export default DataAccount;