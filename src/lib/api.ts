
const API_URL = process.env.NEXT_PUBLIC_API_URL as string


export function getApiUrl(){
    return API_URL
}
interface FetchOptions extends RequestInit {
    token? : string,
    cache? : "force-cache" |  "no-store",
    next?:{
        revalidate: false | 0 | number,
        tags?: string[];

    } 

}

export async function apiClient<T>(
    endopoint:string,
    options: FetchOptions = {}
):Promise<T>{

    const {token , ...fecthoptions} = options

    const headers : Record<string,string> ={
        ...(fecthoptions.headers as Record<string,string>)
    }
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    if(!(fecthoptions.body instanceof FormData)){
        headers["Content-Type"] = "application/json" 
    }


    const response = await fetch(`${API_URL}${endopoint}`,{
        ...fecthoptions,
        headers
    })
    
    if(!response.ok){
        const error = await response.json().catch(() => ({
            error: "Erro HTTP: " + response.status
        }))
        throw new Error(error.error || "Error Requisiçåo")
    }


    return response.json()

}