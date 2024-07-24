import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useCreateAccount() {
    return useMutation({
        mutationFn: ({bankName, iban, balance, customerId, iconPath}) => {
            return axios.post('/api/account', {
                bankName, iban, balance, customerId, iconPath
            });
        }
    })
}