import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function useDeleteCustomer() {
    const router = useRouter();
    const client = useQueryClient();

    return useMutation({
        mutationFn: (id) => {
            return axios.delete(`/api/customer/${id}`);
        }, onSuccess: async () => {
            await client.invalidateQueries({ queryKey: ["CUSTOMER_LIST"] });
        },
    })
}