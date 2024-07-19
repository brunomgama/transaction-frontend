import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useCreateTransaction() {
    return useMutation({
        mutationFn: ({accountId, isDebit, amount}) => {
            return axios.post('/api/transaction', {
                accountId, isDebit, amount
            });
        }
    })
}