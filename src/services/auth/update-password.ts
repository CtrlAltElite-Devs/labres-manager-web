import { api } from "@/lib/axios";
import { User } from "@/types"
import { useMutation } from "@tanstack/react-query";

export type UpdatePasswordDto =  {
    pid: string,
    password: string
}

export type UpdatePasswordResponse = User;

const updatePassword = async (payload: UpdatePasswordDto) => {
    const response = await api.put<UpdatePasswordResponse>("/api/auth/update-user",{
        ...payload
    });

    return response.data;
}

export const useUpdatePassword = () => useMutation({
    mutationFn: updatePassword
})