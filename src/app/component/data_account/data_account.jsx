'use client'

import { TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useDeleteAccount from "../../../libs/account/useDeleteAccount";
import useAccountList from "../../../libs/account/useAccountList";
import Loading from "../loading/loading";

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
                        <tr key={t.accountId}
                            className="bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                            <th scope="row" className="px-6">
                                <img className="w-10 h-10 rounded-xl" src={t.iconPath} alt="Default avatar"/>
                            </th>
                            <td className="px-6 py-4 text-left">
                                {t.bankName}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.iban}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.balance} €
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.customerId}
                            </td>
                            <td className="py-4 text-left">
                                <div className="flex">
                                    <button
                                        className="p-2 rounded mx-4 bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark"
                                        onClick={() => handleEditClick(t.accountId)}>
                                        <TbEdit className="text-xl"/>
                                    </button>
                                    <button
                                        className="p-2 rounded bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark"
                                        onClick={() => handleDeleteClick(t.accountId)}>
                                        <TbCreditCardOff className="text-xl"/>
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