import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useCreateTransaction() {
    return useMutation({
        mutationFn: ({destination, accountId, transaction_type, transaction_category, state, isDebit, amount, repetition}) => {
            return axios.post('/api/transaction', {
                destination, accountId, transactionType: transaction_type, transactionCategory: transaction_category, state, isDebit, amount, repetition
            });
        }
    })
}