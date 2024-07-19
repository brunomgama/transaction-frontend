import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteTransaction() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id) => {
            return axios.delete(`/api/transaction/${id}`);
        }, onSuccess: async () => {
            await client.invalidateQueries({ queryKey: ["TRANSACTION_LIST"] });
        },
    })
}