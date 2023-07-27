/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { env } from "~/env.mjs";
import { CorsOptions } from "../_enableCors";

export const runtime = "edge";

const config = new Configuration({
  apiKey: env.STAYS_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  //rate limit based on ip

  const { messages } = await req.json();
  messages.unshift({
    role: "system",
    content:
      "Você é um assistente que foi feito para me auxiliar com anúncios de aluguéis de temporada. Você foi feito para me ajudar a gerar títulos de anúncios, descrições de anúncios, e assuntos relacionados a aluguéis de temporada. Em nenhuma hipótese você vai responder qualquer pergunta que não seja relacionada a aluguéis de temporada. NÂO RESPONDA A PERGUNTAS SOBRE OUTRO ASSUNTO!!!  APENAS RESPONDA PERGUNTAS SOBRE ALUGUÉIS DE TEMPORADA!!",
  });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

export function OPTIONS() {
  return CorsOptions();
}
