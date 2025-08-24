import { api } from "@/lib/axios";
import { LabResult } from "@/types";
import { ApiVersion } from "@/types/api-version";
import { useQuery } from "@tanstack/react-query";

const VERSION : ApiVersion = "v1";

const getResults = (): Promise<LabResult[]> =>
    api.get(`/api/${VERSION}/test-result`).then((res) => res.data);

export const useGetResults = () =>
    useQuery({
        queryKey: ["test-results"],
        queryFn: () => getResults()
    });
