import { NextResponse } from "next/server";
import { destinations } from "@/lib/data";
import { allowRequest } from "@/lib/rate-limit";

function generateLocalAnswer(message: string) {
  const q = message.toLowerCase();

  // Match specific destination by name or slug
  const matchedDest = destinations.find(
    (d) => q.includes(d.name.toLowerCase()) || q.includes(d.slug) || (d.state && q.includes(d.state.toLowerCase()))
  );

  if (matchedDest) {
    return {
      answer: `${matchedDest.name} (${matchedDest.region}, ${matchedDest.country}) is a wonderful match. ${matchedDest.description} ${matchedDest.longDescription ?? ""} Recommended duration is ${matchedDest.duration} with an estimated budget from ${matchedDest.budget} (daily spend around ${matchedDest.dailyBudget ?? "₹3,500"}). Optimal travel window is ${matchedDest.bestTime}.`,
      itinerary: [
        `Morning: Explore ${matchedDest.knownFor[0] ?? "historic quarters"}`,
        `Afternoon: Experience ${matchedDest.knownFor[1] ?? "scenic local highlights"} and taste ${matchedDest.localFood?.[0] ?? "regional specialties"}`,
        `Evening: Sunset at ${matchedDest.topAttractions?.[0] ?? "viewpoint"} followed by authentic dining`,
      ],
      destination: matchedDest.slug,
      characteristics: matchedDest.characteristics,
    };
  }

  // Winter search
  if (q.includes("winter") || q.includes("snow") || q.includes("cold")) {
    return {
      answer: "For winter travel, top picks include Goa (sun-warmed beaches and cultural festivals), Rajasthan (Jaipur & Udaipur for royal heritage palace tours), Kashmir & Gulmarg (pristine snowfall and skiing), Varanasi (serene morning ghats and Aarti), and Dubai (pleasant desert safaris).",
      itinerary: ["Day 1-2: Cultural heritage & historic walks", "Day 3-4: Local culinary trail & scenic waterways", "Day 5: Unhurried leisure and sunset views"],
      destination: "goa",
    };
  }

  // Monsoon search
  if (q.includes("monsoon") || q.includes("rain")) {
    return {
      answer: "Monsoon reveals lush greenery in Kerala (Alleppey & Munnar backwaters and tea hills), Meghalaya (roaring waterfalls and living root bridges), and Hampi (dramatic boulders and misty riverbanks).",
      itinerary: ["Morning: Rainforest walk / waterfall trek", "Afternoon: Fresh plantation tea tasting", "Evening: Cozy heritage homestay dining"],
      destination: "kerala",
    };
  }

  // Summer search
  if (q.includes("summer") || q.includes("hot") || q.includes("mountain") || q.includes("hill")) {
    return {
      answer: "For summer escapes, consider Ladakh (high mountain passes, Pangong Lake & Nubra Valley), Manali (pine forest resets and Solang trails), the Swiss Alps (wildflower trails and Glacier Express), and Bali (tropical coastlines and rice terraces).",
      itinerary: ["Morning: High altitude pass / alpine trail", "Afternoon: Monastery / village immersion", "Evening: Star gazing in crisp mountain air"],
      destination: "ladakh",
    };
  }

  // Packing search
  if (q.includes("pack") || q.includes("luggage") || q.includes("wear")) {
    return {
      answer: "Key packing essentials: 1) Breathable cottons for daytime and layered woolens/fleece for mountain evenings. 2) Comfortable broken-in walking shoes. 3) Universal adapter & power bank. 4) Weather-proof rain shell or sun hat. 5) Modest attire for heritage temples and sacred shrines.",
      itinerary: ["Organize travel documents & offline tickets", "Pack daily essentials & medications", "Prepare weather-appropriate outer layer"],
    };
  }

  // Budget search
  if (q.includes("budget") || q.includes("₹") || q.includes("rs") || q.includes("cost") || q.includes("cheap")) {
    return {
      answer: "For budget-friendly journeys under ₹20,000–₹25,000, consider Goa, Hampi, Varanasi, Jaipur, or Coorg. You can enjoy authentic boutique homestays, South Indian thalis or street snacks, and scenic rail transit without sacrificing comfort.",
      itinerary: ["Choose scenic train transit (Vande Bharat / Express)", "Opt for heritage village homestays", "Focus on walkable old quarters and free historical walks"],
      destination: "hampi",
    };
  }

  // Default answer
  return {
    answer: "Welcome to TRAVEXA! Tell me a destination, region (India, Europe, Asia, Middle East), preferred season, travel style (Nature, Heritage, Slow Travel, Adventure, Romantic), or budget, and I will tailor a detailed itinerary from our library of verified travel data.",
    itinerary: ["Morning: Immersive cultural walk", "Afternoon: Signature regional experience & dining", "Evening: Sunset and tranquil local stay"],
  };
}

export async function POST(request: Request) {
  try {
    if (!allowRequest(request, "assistant", 20, 60_000)) return NextResponse.json({ error: "Please wait before sending more assistant requests." }, { status: 429 });
    const body = await request.json().catch(() => ({}));
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message || message.length > 1500) {
      return NextResponse.json({ error: "Enter a message of up to 1,500 characters." }, { status: 400 });
    }

    const aiApiKey = process.env.TRAVEXA_AI_API_KEY;
    const aiBaseUrl = process.env.TRAVEXA_AI_BASE_URL;

    // If external AI key is configured, query provider with fallback to local knowledge
    if (aiApiKey) {
      try {
        const response = await fetch(aiBaseUrl || "https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiApiKey}`,
          },
          body: JSON.stringify({
            model: process.env.TRAVEXA_AI_MODEL || "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are the TRAVEXA AI Travel Assistant, helping users with thoughtful travel discovery, realistic budgets, packing suggestions, and cultural context across India and the World.",
              },
              { role: "user", content: message },
            ],
            max_tokens: 500,
          }),
          signal: AbortSignal.timeout(15_000),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return NextResponse.json({
              mode: "provider",
              answer: content,
            });
          }
        }
      } catch (externalErr) {
        console.warn("External AI call failed, falling back to structured engine:", externalErr);
      }
    }

    const result = generateLocalAnswer(message);
    return NextResponse.json({
      mode: "local-engine",
      ...result,
    });
  } catch {
    return NextResponse.json(
      { error: "The TRAVEXA assistant is temporarily unavailable." },
      { status: 500 }
    );
  }
}
