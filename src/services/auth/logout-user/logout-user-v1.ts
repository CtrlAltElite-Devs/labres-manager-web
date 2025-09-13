import { api } from "@/lib/axios";
import { ApiVersion } from "@/types/api-version"
import { useMutation } from "@tanstack/react-query";

const VERSION : ApiVersion = "v1";

const logOutUser = async () => {
    return await api.post(`api/${VERSION}/auth/log-out`);
}

export const useLogOut = () => useMutation({
    mutationFn: logOutUser
})