import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useTransactionFilteredList(id) {
    return useQuery(
        {
            queryKey: ['TRANSACTION_FILTERED_LIST', id],
            queryFn: async () => (await axios.get(`/api/transaction/filter/${id}`)).data
        }
    );
}
