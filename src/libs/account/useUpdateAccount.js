import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateAccount() {
    return useMutation({
        mutationFn: ({id, bankName, iban, balance, customerId, iconPath}) => {
            return axios.put(`/api/account/${id}`, {
                bankName, iban, balance, customerId, iconPath
            });
        }
    })
}