import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateTransaction() {
    return useMutation({
        mutationFn: ({id, accountId, isDebit, amount}) => {
            return axios.put(`/api/transaction/${id}`, {
                accountId, isDebit, amount
            });
        }
    })
}