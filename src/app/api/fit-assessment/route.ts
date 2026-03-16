import { NextRequest } from "next/server";
import OpenAI from "openai";
import { LUIS_SYSTEM_PROMPT } from "@/src/data/ai-context";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Please provide a job description (at least 50 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const fitPrompt = `${LUIS_SYSTEM_PROMPT}

---

You are now evaluating a job description against Luis's experience. Analyze the job description below and provide an honest fit assessment.

Respond in this exact JSON format (no markdown, no code fences, just raw JSON):
{
  "score": <number 0-100>,
  "verdict": "<one sentence: Strong Fit / Moderate Fit / Stretch / Not a Fit>",
  "summary": "<2-3 sentence honest assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "gaps": ["<gap 1>", "<gap 2>"],
  "recommendation": "<Should Luis apply? Why or why not? 2-3 sentences.>",
  "interviewTips": ["<tip 1>", "<tip 2>"]
}

Be honest. If it's not a fit, say so. Employers respect honesty over spin.

JOB DESCRIPTION:
${jobDescription.slice(0, 5000)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fitPrompt }],
      max_tokens: 1500,
      temperature: 0.5,
    });

    const content = completion.choices[0]?.message?.content || "";

    try {
      const result = JSON.parse(content);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(
        JSON.stringify({
          score: 0,
          verdict: "Unable to assess",
          summary: content,
          strengths: [],
          gaps: [],
          recommendation: "Could not parse the assessment. Please try again.",
          interviewTips: [],
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Fit assessment error:", error);
    return new Response(JSON.stringify({ error: "Failed to assess fit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
