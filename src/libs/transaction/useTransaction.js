import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useTransaction(id) {
    return useQuery(
        {
            queryKey: ['TRANSACTION', id],
            queryFn: async () => (await axios.get(`/api/transaction/${id}`)).data
        }
    );
}
