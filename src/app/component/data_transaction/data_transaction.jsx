'use client'

import { TbEdit, TbCreditCardOff, TbSquarePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import useDeleteTransaction from "../../../libs/transaction/useDeleteTransaction";
import useTransactionList from "../../../libs/transaction/useTransactionList";

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
                <div role="status">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
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
                                {t.accountId}
                            </td>
                            <td className="px-6 py-4 text-left">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-white ${t.isDebit ? 'bg-debit' : 'bg-credit'}`}>
                                        {t.isDebit ? 'Debit' : 'Credit'}
                                    </span>
                            </td>
                            <td className="px-6 py-4 text-left">
                                {t.isDebit ? '+' : '-'} {t.amount} €
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
