import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface TestResultDto {
    id : string;
    base64Pdf : string
}

const getResult = async (id: string): Promise<TestResultDto> => {
    console.log("getting result for " + id);
    try {
        const response = await api.get<TestResultDto>(`/api/test-result/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get result:", error);
        throw error; // re-throw if needed
    }
};


export const useGetIndividualResult = (id: string) => {
    return useQuery({
        queryKey: ["test-results", id],
        queryFn: () => getResult(id),
        enabled: !!id,
    });
};
