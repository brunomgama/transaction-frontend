import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useAccount(id) {
    return useQuery(
        {
            queryKey: ['ACCOUNT', id],
            queryFn: async () => (await axios.get(`/api/account/${id}`)).data
        }
    );
}
