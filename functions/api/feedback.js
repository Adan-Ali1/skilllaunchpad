const SITE_ORIGIN = "https://skilllaunchpad.pages.dev";
const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };

function reply(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: jsonHeaders });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== SITE_ORIGIN) return reply({ error: "Request not allowed." }, 403);
  if (!env.FEEDBACK_TO) return reply({ error: "Feedback email is not configured yet." }, 503);

  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > 12000) return reply({ error: "Message is too large." }, 413);

  let fields;
  try {
    const contentType = request.headers.get("Content-Type") || "";
    fields = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return reply({ error: "Please check the form and try again." }, 400);
  }

  if (String(fields._honey || "").trim()) return reply({ success: true });

  const name = String(fields.name || "").trim().slice(0, 100);
  const email = String(fields.email || "").trim().slice(0, 254);
  const topic = String(fields.topic || "Website feedback").trim().slice(0, 80);
  const message = String(fields.message || "").trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return reply({ error: "Enter your name, a valid email, and a message." }, 400);
  }

  const form = {
    name,
    email,
    _replyto: email,
    topic,
    message,
    _subject: `SkillLaunchpad feedback: ${topic}`,
    _template: "table",
    _url: `${SITE_ORIGIN}/contact.html`
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(env.FEEDBACK_TO)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(form)
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result || result.success === false || result.success === "false") {
      console.error("Feedback provider rejected submission", response.status, result?.message || result?.success || "invalid response");
      return reply({ error: "We couldn't send your message right now. Please try again later." }, 502);
    }
    return reply({ success: true });
  } catch (error) {
    console.error("Feedback provider request failed", error instanceof Error ? error.message : "unknown error");
    return reply({ error: "We couldn't send your message right now. Please try again later." }, 502);
  }
}