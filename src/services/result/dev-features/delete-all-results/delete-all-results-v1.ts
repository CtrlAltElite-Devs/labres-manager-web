import { api } from "@/lib/axios"
import { ApiVersion } from "@/types/api-version";
import { useMutation } from "@tanstack/react-query";

const VERSION : ApiVersion = "v1";

const deleteAllResults = async () : Promise<string> => {
    const response = await api.delete(`/api/${VERSION}/test-result/delete-all`);
    return response.data;
}

export const useDeleteAllResults = () => useMutation({
    mutationFn: deleteAllResults
})