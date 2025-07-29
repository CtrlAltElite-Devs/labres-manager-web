import Axios from "axios";

export const api = Axios.create({
     baseURL: "https://slabres.ctr3.org",
    // baseURL: "https://kfsbqd92-3000.asse.devtunnels.ms",
    withCredentials: true
})
