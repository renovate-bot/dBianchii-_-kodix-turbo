"use client";

import React from "react";
import Link from "next/link";
import { useChat } from "ai/react";
import { User } from "lucide-react";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  ScrollArea,
  Textarea,
} from "@kdx/ui";

import { StaysIcon, StaysLogo } from "./SVGs/index";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: `${
        process.env.NODE_ENV === "production"
          ? "https://www.kodix.com.br"
          : "http://localhost:3000"
      }/api/ai`,
    });

  const messageExamples = [
    "Faça a descrição de um apartamento de dois quartos em Ipanema para o Airbnb",
    "Como chamar mais atenção para meu anúncio?",
    "Como posso melhorar a divulgação do meu anúncio?",
  ];

  return (
    <Card className="w-[800px]">
      <CardHeader className="shadow">
        <CardTitle>
          <Link target="_blank" href="https://www.stays.net">
            <StaysLogo className="h-10 w-40" />
          </Link>
        </CardTitle>
        <CardDescription className="text-md">
          Assistente para aluguéis de temporada
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid w-full items-center gap-4">
          <ScrollArea className="h-[600px]">
            <div className="">
              {messages.length === 0 && (
                <div className="mx-8 mt-6 grid grid-cols-3 gap-4">
                  {messageExamples.map((message, i) => (
                    <Button
                      key={i}
                      className="h-32"
                      onClick={() => {
                        setInput(message);
                      }}
                      variant={"outline"}
                    >
                      <p className="text-center text-sm italic">
                        &quot;{message}&quot;
                      </p>
                    </Button>
                  ))}
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(message.role === "assistant" && "bg-muted")}
                >
                  <div className="mx-6 flex flex-row py-4">
                    <Avatar className="h-10 w-10">
                      {message.role === "assistant" ? (
                        <StaysIcon className="h-auto w-auto p-1" />
                      ) : (
                        <User className="h-auto w-auto p-1" />
                      )}
                    </Avatar>
                    <p className="ml-4 text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between space-x-2">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setInput("");
          }}
          className="flex w-full gap-2"
        >
          <Textarea
            placeholder="Gere um título..."
            onChange={(e) => {
              handleInputChange(e);
              setInput("");
            }}
            value={input}
          />
          <Button variant="default" type="submit">
            Enviar
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
