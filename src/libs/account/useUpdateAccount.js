import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateAccount() {
    return useMutation({
        mutationFn: ({id, customerId, balance}) => {
            return axios.put(`/api/account/${id}`, {
                customerId, balance
            });
        }
    })
}