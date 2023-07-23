"use client";

import React from "react";
import { useChat } from "ai/react";

import {
  Avatar,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Input,
  ScrollArea,
} from "@kdx/ui";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${
      process.env.NODE_ENV === "production"
        ? "www.kodix.com.br"
        : "http://localhost:3000"
    }/api/ai`,
  });

  //const messages = [
  //  {
  //    id: Math.random(),
  //    role: "user",
  //    content:
  //      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repudiandae?",
  //  },
  //  {
  //    id: Math.random(),
  //    role: "assistant",
  //    content:
  //      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repudiandae?",
  //  },
  //  {
  //    id: Math.random(),
  //    role: "user",
  //    content:
  //      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repudiandae?",
  //  },
  //  {
  //    id: Math.random(),
  //    role: "assistant",
  //    content:
  //      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, repudiandae?",
  //  },
  //];

  return (
    <Card className="w-[800px]">
      <CardHeader className="text-center">
        <CardTitle>Gerador de títulos Stays</CardTitle>
        <CardDescription>Crie seus títulos aqui!</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid w-full items-center gap-4 space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="mt-10">
              {messages.length === 0 && (
                <div className="mx-8 grid grid-cols-3 gap-4">
                  <Card className="bg-muted flex flex-col items-center space-y-1.5">
                    <CardContent className="flex justify-center align-middle">
                      <p className="text-center">
                        &quot;Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Molestias, repudiandae?&quot;
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted flex flex-col items-center space-y-1.5">
                    <CardContent className="flex justify-center align-middle">
                      <p className="text-center">
                        &quot;Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Molestias, repudiandae?&quot;
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted flex flex-col items-center space-y-1.5">
                    <CardContent className="flex justify-center align-middle">
                      <p className="text-center">
                        &quot;Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Molestias, repudiandae?&quot;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(message.role === "assistant" && "bg-muted")}
                >
                  <div className="mx-6 flex flex-row py-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          message.role == "user"
                            ? "https://github.com/dbianchii.png"
                            : "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <p className="text-foreground ml-2 text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input placeholder="Gere um título..." onChange={handleInputChange} />
          <Button type="submit" value={input}>
            Enviar
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
