import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useCreateAccount() {
    return useMutation({
        mutationFn: ({customerId, balance}) => {
            return axios.post('/api/account', {
                customerId, balance
            });
        }
    })
}