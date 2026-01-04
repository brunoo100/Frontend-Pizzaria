'use client'
import { useActionState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from"@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import  {Button} from "@/components/ui/button"
import Link from "next/link"
import {LoginAction} from '@/actions/auth'
import { useRouter } from "next/navigation"





export function LoginForm(){
    const [state, formAction, isPanding ] = useActionState(LoginAction
        ,null)
        const router = useRouter()

        useEffect(() =>{
            if(state?.success && state?.redirectTo){
                router.replace(state?.redirectTo)
            }

        }, [state,router])

    return(
        <Card className="bg-app-card border-app-border w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-white text-center text-3xl
                 sm:text-4xl font-bold ">
                    Sujeito
                   <span className="text-brand-primary">Pizza</span>
                    </CardTitle>
                    <CardDescription className="text-center">
                        Prencha os dados para criar sua conta
                    </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action={formAction}>

                <div className="space-y-2">
                    <Label htmlFor="email"
                    className="text-white"
                     >Email</Label>
                    <Input
                    type= 'email'
                    id="email"
                    name="email"
                    placeholder="Digitar seu Email"
                    required
                    className="text-white 
                     bg-app-card border-app-border"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="senha"
                    className="text-white"
                     >Senha</Label>
                    <Input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Digitar sua Senha..."
                    required
                    className="text-white 
                     bg-app-card border-app-border"
                    />
                </div>
                
                <Button type="submit" 
                className="w-full text-white
                 bg-brand-primary hover:bg-brand-primary
                 ">
                 {isPanding ? 'Acessando Conta' :   'Acessar' }
                </Button>

                {state?.error && (
                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                        {state.error}
                    </div>
                )}

                <p className="text-center text-sm text-gray-100">
                    Ainda nao possuir conta?{" "}
                     <Link className="text-brand-primary font-semibold" href='/register'> 
                     Cria uma Conta 
                     </Link>
                </p>
                


              </form>
            </CardContent>
        </Card>

    )
}