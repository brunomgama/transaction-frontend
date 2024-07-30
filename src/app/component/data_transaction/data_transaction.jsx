'use client'

import { TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useDeleteTransaction from "../../../libs/transaction/useDeleteTransaction";
import useTransactionList from "../../../libs/transaction/useTransactionList";
import Loading from "../loading/loading";

const DataTransaction = ({ list }) => {
    const router = useRouter();
    const deleteTransaction = useDeleteTransaction();

    const { data, isLoading } = useTransactionList();

    const handleEditClick = (id) => {
        router.push(`/transaction/${id}`);
    };

    const handleAddClick = () => {
        router.push(`/transaction/create`);
    };

    const handleDeleteClick = (id) => {
        deleteTransaction.mutate(id);
    };

    console.log(data)

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
            {isLoading ? (
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
                            <th scope="row" className="py-4 font-medium whitespace-nowrap text-left">
                                <div className="flex px-6 py-3 text-left">
                                    {t.id}
                                </div>
                            </th>
                            <td className="px-6 py-4 text-left">
                                {t.destination}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.accountId}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.transactionTypeName}
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.transactionCategoryName}
                            </td>
                            <td className="px-6 py-4 text-left">
                                <span
                                    className={`inline-block px-3 py-1 rounded-xl text-white ${t.state ? 'bg-paid' : 'bg-pending'}`}>
                                        {t.state ? 'Paid' : 'Pending'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-left">
                                <span
                                    className={`inline-block px-3 py-1 rounded-xl text-white ${t.isDebit ? 'bg-debit' : 'bg-credit'}`}>
                                    {t.isDebit ? 'Debit' : 'Credit'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.isDebit ? '-' : '+'} {t.amount} €
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.repetition ? 'True' : 'False'}
                            </td>
                            <td className="py-4 text-left">
                                <div className="flex">
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
