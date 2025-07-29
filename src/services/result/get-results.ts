import { api } from "@/lib/axios";
import { LabResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getResults = (): Promise<LabResult[]> =>
    api.get(`/api/test-result`).then((res) => res.data);

export const useGetResults = () =>
    useQuery({
        queryKey: ["test-results"],
        queryFn: () => getResults(),
    });
