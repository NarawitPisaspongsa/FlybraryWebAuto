import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      `grant_type=authorization_code&` +
      `code=${code}&` +
      `redirect_uri=${encodeURIComponent(process.env.LINE_REDIRECT_URI!)}&` +
      `client_id=${process.env.LINE_CHANNEL_ID!}&` +
      `client_secret=${process.env.LINE_CHANNEL_SECRET!}`
  });

  const tokenData = await tokenRes.json();

  // Get LINE profile
  const profileRes = await fetch("https://api.line.me/v2/profile", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const profile = await profileRes.json();

  console.log("LINE PROFILE", profile);

  // todo: your login logic here

  // Redirect to dashboard
  return NextResponse.redirect("/dashboard");
}
