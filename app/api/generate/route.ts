import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
function getClient() { return new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" }); }
const PROMPT = `You are an expert food blogger and content writer. Write a compelling, engaging food blog post with storytelling, recipe narrative, and rich sensory descriptions.

Dish/Recipe: {dish}
Cuisine: {cuisine}
Content Angle: {angle}
Post Length: {length}
Optional Title: {title}

Please write a complete blog post that includes:
1. An engaging headline/title
2. A captivating opening hook (story, question, or scene)
3. Background/story context about the dish
4. Ingredient highlights and sourcing notes
5. Step-by-step recipe with narrative (not just instructions)
6. Chef's tips and variation suggestions
7. A memorable closing that invites reader engagement

Make it vivid, sensory, and SEO-friendly.`;
export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    const { title, dish, cuisine, angle, length } = await req.json();
    if (!dish?.trim()) return NextResponse.json({ error: "Dish name is required" }, { status: 400 });
    const prompt = PROMPT.replace("{dish}", dish).replace("{cuisine}", cuisine).replace("{angle}", angle).replace("{length}", length).replace("{title}", title || "Untitled");
    const completion = await getClient().chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.8, max_tokens: 2000 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No content generated." });
  } catch (err: any) { return NextResponse.json({ error: err?.message || "Generation failed" }, { status: 500 }); }
}
