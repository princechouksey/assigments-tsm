import axios from "./axiosConfig"
import { toast } from "react-toastify";

export const signupService = async (data)=>{
   try {
    const res = await axios.post("/user/register", data);
    toast.success(res.data.message)
    return res;
   } catch (error) {
    toast.error(error.message)
   }

   
}

export const loginService = async (data)=>{
    try {
    const res = await axios.post("/user/login", data);
        toast.success(res.data.message)

    return res;
    } catch (error) {
        toast.error(error.message)
        
    }
    
}
export const updateProfileService = async(data)=>{
   try {
    const res = await axios.patch("/user/update", data);
    toast.success(res.data.message)
    return res;
   } catch (error) {
    toast.error(error.message)
    
   }
}
export const getAllUsers = async ()=>{
    try {
        const res  =await axios.get("/user/users");
        toast.success(res.data.message)
        return res;
       
        
    } catch (error) {
        toast.error(error.message)
        
    }
}