import { NextRequest } from "next/server";
import OpenAI from "openai";
import { LUIS_SYSTEM_PROMPT } from "@/src/data/ai-context";
import { rateLimit } from "@/src/lib/rate-limit";
import { getIp } from "@/src/lib/get-ip";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 20;

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    const { success } = rateLimit(`chat:${ip}`, { maxRequests: 10, windowMs: 60 * 1000 });
    if (!success) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const trimmedMessages = messages.slice(-MAX_MESSAGES).map((msg: { role?: string; content?: string }) => {
      if (
        !msg ||
        typeof msg !== "object" ||
        typeof msg.role !== "string" ||
        typeof msg.content !== "string"
      ) {
        return null;
      }
      const role = msg.role === "assistant" ? "assistant" : "user";
      return { role, content: msg.content.slice(0, MAX_MESSAGE_LENGTH) };
    }).filter((msg): msg is { role: "user" | "assistant"; content: string } => msg !== null);

    if (trimmedMessages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid message format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LUIS_SYSTEM_PROMPT },
        ...trimmedMessages,
      ],
      stream: true,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
