import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateCustomer() {
    return useMutation({
        mutationFn: ({id, name, surname}) => {
            return axios.put(`/api/customer/${id}`, {
                name, surname
            });
        }
    })
}