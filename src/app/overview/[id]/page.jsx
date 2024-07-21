'use client';

import { useState, useEffect } from "react";
import useCustomer from "../../../libs/customer/useCustomer";
import useAccountFilteredList from "../../../libs/account/useAccountFilterList";
import useTransactionFilteredList from "../../../libs/transaction/useTransactionFilterList";

const OverviewForm = ({ params }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [accountId, setAccountId] = useState(0);

    const paramId = params.id;

    const { data, isLoading: isLoadingCustomer, isSuccess } = useCustomer(paramId);
    const { data: accountList } = useAccountFilteredList(paramId);
    const { data: transactionFilteredList, isLoading: isLoadingTransactions } = useTransactionFilteredList(accountId);

    useEffect(() => {
        if (isSuccess) {
            setName(data.name);
            setSurname(data.surname);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        console.log(accountId);
    }, [accountId]);

    const handleClick = (accId) => {
        setAccountId(accId);
    };

    return (
        <>
            {isLoadingCustomer ? (
                <div role="status">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* SVG paths here */}
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="w-full flex items-center justify-center mb-4">
                        <form
                            className="flex flex-col gap-3 w-full mx-auto p-6 bg-over-light dark:bg-over-dark bg-opacity-50 rounded-lg">
                            <label htmlFor="customerName" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer Name</label>
                            <input
                                value={name}
                                className="border border-slate-500 px-8 py-2 text-light dark:text-dark" type="text"
                                readOnly={true}
                            />
                            <label htmlFor="customerSurname" className="block mt-2 text-sm font-medium text-light dark:text-dark">Customer Surname</label>
                            <input
                                value={surname}
                                className="border border-slate-500 px-8 py-2 text-light dark:text-dark" type="text"
                                readOnly={true}
                            />
                        </form>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 flex flex-col items-center justify-center mb-4 md:mb-0 md:mr-4">
                            <div>
                                {accountList?.map((t) => (
                                    <div key={t.accountId} className="px-6 py-3 text-left">
                                        <div className="flex overflow-x-auto justify-center">
                                            <div
                                                className={`w-72 flex-none cursor-pointer flex flex-col items-center justify-center m-4 rounded-xl p-4
                                                 ${accountId === t.accountId ? 'bg-selected-light' : 'bg-over-light'} 
                                                 dark:${accountId === t.accountId ? 'bg-selected-dark' : 'bg-over-dark'} 
                                                 hover:bg-selected-light dark:hover:bg-selected-dark 
                                                 transition duration-300`}
                                                onClick={() => handleClick(t.accountId)}
                                            >
                                                <div className="flex items-center justify-center">
                                                    <span className="font-medium text-2xl m-4 text-light dark:text-dark">
                                                        Account ID
                                                    </span>
                                                    {t.accountId}
                                                    <span className="font-medium text-2xl m-4 text-light dark:text-dark">
                                                        Balance
                                                    </span>
                                                    {t.balance} €
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block w-4"></div>
                        {accountId !== 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                {isLoadingTransactions ? (
                                    <div role="status">
                                        <svg aria-hidden="true"
                                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                        <span className="sr-only">Loading Transactions...</span>
                                    </div>
                                ) : (
                                    <div>
                                        {transactionFilteredList?.length > 0 ? (
                                            transactionFilteredList.map((transaction) => (
                                                <div key={transaction.id} className="px-6 py-3 text-left">
                                                    <div className="flex overflow-x-auto justify-center">
                                                        <div className="w-72 flex-none cursor-pointer flex flex-col items-center justify-center m-4 rounded-xl p-4
                                                         bg-over-light dark:bg-over-dark
                                                         hover:bg-selected-light dark:hover:bg-selected-dark
                                                         transition duration-300">
                                                            <div className="flex items-center justify-center">
                                                                <span className="text-light dark:text-dark">Transaction ID: {transaction.id}</span>
                                                                <span className="text-light dark:text-dark">Amount: {transaction.amount} €</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-light dark:text-dark">No transactions available for this account.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                NOTHING TO SHOW
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default OverviewForm;
