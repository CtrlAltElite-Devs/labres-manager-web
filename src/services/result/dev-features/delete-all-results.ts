import { api } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

const deleteAllResults = async () : Promise<string> => {
    const response = await api.delete("/api/test-result/delete-all");
    return response.data;
}

export const useDeleteAllResults = () => useMutation({
    mutationFn: deleteAllResults
})