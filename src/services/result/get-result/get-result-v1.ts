import { api } from "@/lib/axios";
import { ApiVersion } from "@/types/api-version";
import { useQuery } from "@tanstack/react-query";

const VERSION : ApiVersion = "v1";

export interface TestResultDto {
    id : string;
    base64Pdf : string
}

const getResult = async (id: string): Promise<TestResultDto> => {
    try {
        const response = await api.get<TestResultDto>(`/api/${VERSION}/test-result/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get result:", error);
        throw error;
    }
};


export const useGetIndividualResult = (id: string) => {
    return useQuery({
        queryKey: ["test-results", id],
        queryFn: () => getResult(id),
        enabled: !!id,
    });
};
