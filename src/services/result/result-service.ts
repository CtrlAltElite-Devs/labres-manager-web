import { Routes } from "@/app/constants/network";
import { apiGet } from "@/lib/api-client";
import { LabResult } from "@/types";

class ResultService {
    async GetAllResults(){
        return apiGet<LabResult[]>(Routes.GET_RESULTS);
    }
}

export const resultService = new ResultService();