const headers = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export function onRequest() {
  return new Response("Not found.", { status: 404, headers });
}
