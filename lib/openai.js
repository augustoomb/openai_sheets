'use server'

require('dotenv').config();
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const URL_OPENAI = 'https://api.openai.com/v1/responses';
const headers = {
    "Authorization": "Bearer " + OPENAI_API_KEY,
    "Content-Type": "application/json",
    "OpenAI-Beta": "assistants=v1"
};

export async function sendMessageToOpenai(message) {

    try {
        const response = await axios({
            method: "POST",
            url: URL_OPENAI,
            data: {
                "model": "gpt-4.1-nano",
                "instructions": "Analise a frase, extraia algumas informações e responda em formato de array de objetos JSON, com as seguintes chaves: {'valor': 'valor em reais'; 'tipo': ('despesa' ou 'receita'); 'descrição': 'breve descrição da entrada'}. Se identificar vários elementos, divida para que cada item seja um elemento do array, mesmo que seja um unico tipo de produto. (exemplo: comprei 5 salgados a 10 reais cada. Você deve listar 5 salgados no array, cada um custando 10 reais ) Se não identificar nenhum elemento, retorne um array vazio.",
                "input": message,
            },
            headers,
        });

        const { output: [{ content: [{ text }] }] } = response.data;
        return { sucess: true, message: text };

    } catch (error) {
        console.error("Erro ao utilizar a openAI", error);
        return { sucess: false, message: error.message || "Erro desconhecido ao utilizar a OpenAI" };
    }
}
