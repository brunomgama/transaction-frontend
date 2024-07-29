import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateTransaction() {
    return useMutation({
        mutationFn: ({id, destination, accountId, transaction_type, transaction_category, state, isDebit, amount, repetition}) => {
            return axios.put(`/api/transaction/${id}`, {
                destination, accountId, transactionType: transaction_type, transactionCategory: transaction_category, state, isDebit, amount, repetition
            });
        }
    })
}