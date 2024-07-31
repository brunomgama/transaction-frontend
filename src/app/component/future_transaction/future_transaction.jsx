'use client'

import { useRouter } from "next/navigation";
import Loading from "../loading/loading";
import useFutureTransactionList from "@/libs/transaction/useFutureTransactionList";

const FutureOverview = ({ list }) => {
    const router = useRouter();

    const { data, isLoading } = useFutureTransactionList();

    return (
        <div className="relative overflow-x-auto">
            {isLoading ? (
                <Loading />
            ) : (
                <table className="w-full text-sm text-light dark:text-dark">
                    <thead className="text-xs uppercase bg-over-light dark:bg-over-dark text-light dark:text-dark">
                    <tr>
                        {list.slice(0, -1).map((t) => (
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
                            <td className="px-6 py-4 text-left">
                                {t.transactionDate}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FutureOverview;
