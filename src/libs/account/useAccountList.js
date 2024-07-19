import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useAccountList() {
    return useQuery(
        {
            queryKey: ['ACCOUNT_LIST'],
            queryFn: async () => (await axios.get('/api/account')).data
        }
    );
}
