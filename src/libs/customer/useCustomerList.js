import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useCustomerList() {
    return useQuery(
        {
            queryKey: ['CUSTOMER_LIST'],
            queryFn: async () => (await axios.get('/api/customer')).data
        }
    );
}
