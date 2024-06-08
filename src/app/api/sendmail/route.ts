import { sendMail } from "@/lib/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  if (!data.body || !data.name || !data.to) {
    return NextResponse.json({ message: "error" });
  }
  const result = await sendMail({
    to: data.to,
    name: data.name,
    subject: data.subject,
    body: data.body,
  });
  return NextResponse.json({ message: `TEST OK`, data: result });
}
