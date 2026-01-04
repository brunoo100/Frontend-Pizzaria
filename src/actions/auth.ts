// '''use Server'''
'use server'

import { apiClient } from "@/lib/api";
import { redirect } from "next/navigation";
import { UserProps, AuthResponse } from "@/types/types";
import { setToken, removerToken } from "@/lib/auth";


export async function  registerAction(
    prevState:{success:boolean; error: string, redirectTo?:string } | null,
    formData: FormData
){
   try{
    const email = formData.get('email') as string
    const nome = formData.get('name') as string
    const senha = formData.get('senha') as string

const data ={
  nome:nome,
  email:email,
  senha:senha
}

    const user= await apiClient<UserProps>('/register', {
        method: "POST",
        body:JSON.stringify(data)
        
    })

    return { success:true , error:'', redirectTo:"/login" }
   } catch(err){

    if(err instanceof Error){
        return {success:false , error:err.message }
    }
    return {success:false , error:'Error ao cria Conta' }


   }
//    redirect('/login')
    
}

export async function LoginAction( 
    prevState:{
        success:boolean;
         error: string,
          redirectTo?:string } | null,
    formData: FormData) {

        try{
            const email = formData.get('email') as string
            const senha = formData.get('senha') as string
    
            const data = {
                email:email,
                senha:senha
            }
            
            const response = await apiClient<AuthResponse>('/login',{
                method:"POST",
                body: JSON.stringify(data)
            })

            await setToken(response.token)
    
            
            // console.log( response);
            
        
        return {success:true, error: "" , redirectTo: "/dashboard"}
        }   
        catch(err){
            console.log(err);
            
            if(err instanceof Error){
                return {success:false , error:err.message || 'Error ao fazer ao login' }
            }
            return {success:false , error:'Error ao fazer ao login' }
            

        }  


}

export async function LogoutAction(){
await removerToken()
redirect('/login')
}