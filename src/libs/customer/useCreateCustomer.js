import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useCreateCustomer() {
    return useMutation({
        mutationFn: ({name, surname}) => {
            return axios.post('/api/customer', {
                name, surname
            });
        }
    })
}