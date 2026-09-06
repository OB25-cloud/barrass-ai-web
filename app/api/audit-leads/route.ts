import { listAuditLeads } from "@/app/lib/audit";

/* GET /api/audit-leads?limit=100
   Returns audit leads from Barrass OS, newest first.

   Protected with a bearer token so lead details are not public:
     Authorization: Bearer <AUDIT_LEADS_API_KEY>
   or, for quick checks in a browser:
     /api/audit-leads?key=<AUDIT_LEADS_API_KEY>
*/

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expected = process.env.AUDIT_LEADS_API_KEY;
  if (!expected) {
    return Response.json(
      { error: "AUDIT_LEADS_API_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7).trim() : url.searchParams.get("key") ?? "";
  if (provided !== expected) {
    return Response.json({ error: "Unauthorised." }, { status: 401 });
  }

  const limitParam = Number(url.searchParams.get("limit") ?? "100");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(Math.floor(limitParam), 1), 1000) : 100;

  try {
    const leads = await listAuditLeads(limit);
    return Response.json({ count: leads.length, leads });
  } catch (err) {
    console.error("[audit-leads] read failed:", err);
    return Response.json({ error: "Could not read leads from Barrass OS." }, { status: 502 });
  }
}
