import { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id : string,
    email : string
}

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0()
    const createMyUserRequest = async (user : CreateUserRequest) =>{
    const accessToken = await getAccessTokenSilently()
    const response = await axios.post(`${API_BASE_URL}/api/my/user`, JSON.stringify(user), {
      
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
       
      });
  
      if (!response) {
        throw new Error("Failed to create user");
      }
    };
    
    const {mutateAsync : createUser , isLoading , isError, isSuccess} = useMutation(createMyUserRequest)
  
    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type UpdateMyUserRequest = {
  name: string;
  phone:string;
  addressLine1:string;
  city:string;
  country:string;
}

export const useUpdateMyUser =  () =>{
   const {getAccessTokenSilently} = useAuth0()

   const updateCurrentUser = async (formData : UpdateMyUserRequest) => {
       const accessToken = await getAccessTokenSilently()
        const response = await axios.put(`${API_BASE_URL}/api/my/user` , JSON.stringify(formData) ,
     { 
      headers : {
        Authorization:`Bearer ${accessToken}`,
        "Content-Type":"application/json",
      },
   });

      if(!response ){
          throw new Error("failed to update user")
      }
     return response.data;
   }

   const {mutateAsync : updateUser , isLoading , isSuccess , isError ,error,reset} = useMutation(updateCurrentUser)

   if(isSuccess){
    toast.success("User Profile updated!")
   }

   if(error){
    toast.error(error.toString());
    reset()
   }
   return {
    updateUser , isLoading , isSuccess , isError , error , reset
   }
}


export const useGetMyUser = () =>{
  const {getAccessTokenSilently} = useAuth0();
  const getMyUserRequest = async ():Promise<User> => {
    const accessToken = await getAccessTokenSilently()
    const response = await axios.get(`${API_BASE_URL}/api/my/user` , 
      {
        headers : {
          Authorization : `Bearer ${accessToken}`,
          "Content-Type":"application/json",
        }
      }
    )
    if(!response){
      throw new Error("failed to fetch user");
    }
    return response.data
  }

  const {data : currentUser , isLoading , error} = useQuery("fetchCurrentUser" , getMyUserRequest)

  if(error){
    toast.error(error.toString());
  }

  return {currentUser , isLoading}
}
