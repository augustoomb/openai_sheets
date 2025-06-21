'use client';

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendMessageToOpenai } from "@/lib/openai";
import { createPrisma } from "@/lib/prisma";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function SpendingForm({ onSubmitSuccess }: { onSubmitSuccess?: () => void }) {

    const formSchema = z.object({
        inputMessage: z.string().min(5, {
            message: "O Campo de mensagem deve ter pelo menos 5 caracteres.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inputMessage: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await sendMessageToOpenai(values.inputMessage);
            if (response.sucess) {
                const result = await createPrisma(JSON.parse(response.message));
                if (result) {
                    console.log("Mensagem salva com sucesso:", result);
                    form.reset();
                    onSubmitSuccess?.();
                }
            }
        } catch (error) {
            console.log("Erro no cliente:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-1/2 max-w-full bg-white grow p-4">
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-center text-gray-800">
                            Digite sua mensagem
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="inputMessage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mensagem</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="w-full min-h-[120px]"
                                            placeholder="Escreva uma transação financeira que você fez hoje. A IA irá identificar se foi uma receita ou despesa e irá salvar no banco de dados."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Ex: comprei uma blusa por 99 reais ou ganhei 100 reais com uma manutenção de PC</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" variant="default">Enviar</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
