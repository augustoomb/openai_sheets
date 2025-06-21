'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from 'next-auth/react';

export function LoginForm() {

    // const formSchema = z.object({
    //     email: z.string().email({
    //         message: "O Campo deve ser um e-mail válido."
    //     }),
    //     password: z.string().min(5, {
    //         message: "O Campo de senha deve ter pelo menos 5 caracteres.",
    //     }),
    // })

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         email: "",
    //         password: "",
    //     },
    // })

    // async function onSubmit(values: z.infer<typeof formSchema>) {
    //     try {
    //         console.log("Valores do formulário:", values);

    //     } catch (error) {
    //         console.log("Erro no cliente:", error);
    //     }
    // }

    return (
        // <>
        //     <Form {...form}>
        //         <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-1/2 max-w-full bg-white grow p-4 ">
        //             <div className="flex flex-col w-full max-w-md border-none shadow-none gap-y-4">
        //                 <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h1>

        //                 <FormField
        //                     disabled={true}
        //                     control={form.control}
        //                     name="email"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>E-mail</FormLabel>
        //                             <FormControl>
        //                                 <Input
        //                                     type="text"
        //                                     placeholder="email@dominio.com.br"
        //                                     {...field}
        //                                 />
        //                             </FormControl>
        //                             <FormDescription>Digite seu e-mail</FormDescription>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <FormField
        //                     disabled={true}
        //                     control={form.control}
        //                     name="password"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Senha</FormLabel>
        //                             <FormControl>
        //                                 <Input
        //                                     type="password"
        //                                     placeholder="******"
        //                                     {...field}
        //                                 />
        //                             </FormControl>
        //                             <FormDescription>Digite sua senha</FormDescription>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <Button
        //                     type="submit"
        //                     // variant="default"
        //                     disabled={true}
        //                 >
        //                     Entrar
        //                 </Button>
        //             </div>
        //         </form>
        //     </Form>

        // </>

        <div className="flex flex-col items-center justify-center w-full max-w-md bg-white p-4 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Gerenciador Financeiro</h1>
            <div className="flex flex-col gap-y-4 w-full">
                <Button
                    variant="default"
                    onClick={() => signIn('github', { callbackUrl: "/home" })}
                >
                    Login com o GitHub
                </Button>
                <Button
                    variant="default"
                    onClick={() => signIn('google', { callbackUrl: "/home" })}
                >
                    Login com o Google
                </Button>
            </div>
        </div>

    );
}