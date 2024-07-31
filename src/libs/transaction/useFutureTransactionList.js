import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useFutureTransactionList() {
    return useQuery(
        {
            queryKey: ['FUTURE_TRANSACTION_LIST'],
            queryFn: async () => (await axios.get('/api/transaction/future')).data
        }
    );
}
