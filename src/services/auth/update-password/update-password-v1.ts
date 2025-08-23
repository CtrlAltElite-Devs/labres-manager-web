import { api } from "@/lib/axios";
import { User } from "@/types"
import { ApiVersion } from "@/types/api-version";
import { useMutation } from "@tanstack/react-query";

const VERSION : ApiVersion = "v1";

export type UpdatePasswordDto =  {
    pid: string,
    password: string
}

export type UpdatePasswordResponse = User;

const updatePassword = async (payload: UpdatePasswordDto) => {
    const response = await api.put<UpdatePasswordResponse>(`/api/${VERSION}/auth/update-user`,{
        ...payload
    });

    return response.data;
}

export const useUpdatePassword = () => useMutation({
    mutationFn: updatePassword
});