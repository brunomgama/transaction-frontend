import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useTransactionList() {
    return useQuery(
        {
            queryKey: ['TRANSACTION_LIST'],
            queryFn: async () => (await axios.get('/api/transaction')).data
        }
    );
}
