import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteAccount() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id) => {
            return axios.delete(`/api/account/${id}`);
        }, onSuccess: async () => {
            await client.invalidateQueries({ queryKey: ["ACCOUNT_LIST"] });
        },
    })
}