'use client'

import { TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useCustomerList from "../../../libs/customer/useCustomerList";
import useDeleteCustomer from "../../../libs/customer/useDeleteCustomer";
import useDeleteAccount from "../../../libs/account/useDeleteAccount";
import useAccountList from "../../../libs/account/useAccountList";
import useDeleteTransaction from "../../../libs/transaction/useDeleteTransaction";
import useTransactionList from "../../../libs/transaction/useTransactionList";

const DataTransaction = ({ list }) => {
    const router = useRouter();
    const deleteTransaction = useDeleteTransaction()

    const { data, isLoading } = useTransactionList()

    const handleEditClick = (id) => {
        router.push(`/transaction/${id}`);
    };

    const handleAddClick = () => {
        router.push(`/transaction/create`);
    };

    const handleDeleteClick = (id) => {
        deleteTransaction.mutate(id)
    };

    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-end items-center mb-4">
                <button
                    className="p-2 rounded border border-light dark:border-dark text-light dark:text-dark flex items-center hover:bg-selected-light dark:hover:bg-selected-dark"
                    onClick={handleAddClick}>
                    <span>Add Transaction</span>
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
                    <tr key={t.id}
                        className="bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                        <th scope="row" className="py-4 font-medium whitespace-nowrap text-left">
                            <div className="flex">
                                {t.id}
                            </div>
                        </th>
                        <td className="px-6 py-4 text-left">
                            {t.accountId}
                        </td>
                        <td className="px-6 py-4 text-left">
                            {t.isDebit}
                        </td>
                        <td className="px-6 py-4 text-left">
                            {t.amount} €
                        </td>
                        <td className="py-4 text-left">
                            <div className="flex">
                                <button
                                    className="p-2 rounded mx-4 bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                                    <TbEdit className="text-xl" onClick={() => handleEditClick(t.id)}/>
                                </button>
                                <button
                                    className="p-2 rounded bg-over-light dark:bg-over-dark text-light dark:text-dark hover:bg-selected-light dark:hover:bg-selected-dark">
                                    <TbCreditCardOff className="text-xl" onClick={() => handleDeleteClick(t.id)}/>
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

export default DataTransaction;