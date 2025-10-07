// Placeholder API route removed for frontend-only workspace.
// Restore a real API route using Next.js and Clerk in a Next.js project.

export async function GET() {
  return new Response(JSON.stringify({ ok: true, message: "placeholder" }), {
    headers: { "Content-Type": "application/json" },
  });
}
