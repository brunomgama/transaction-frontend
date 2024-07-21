import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useAccountFilteredList(id) {
    return useQuery(
        {
            queryKey: ['ACCOUNT_FILTERED_LIST', id],
            queryFn: async () => (await axios.get(`/api/account/filter/${id}`)).data
        }
    );
}
