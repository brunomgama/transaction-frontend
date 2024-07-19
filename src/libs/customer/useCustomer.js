import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useCustomer(id) {
    return useQuery(
        {
            queryKey: ['CUSTOMER', id],
            queryFn: async () => (await axios.get(`/api/customer/${id}`)).data
        }
    );
}
