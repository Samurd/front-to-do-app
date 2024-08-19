import { api_url } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookie = cookies();
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const response = await fetch(api_url + "/api/auth/refresh", {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie.toString(),
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: response.status }
    );
  }

  const res = NextResponse.json({
    success: true,
  });

  const cookiesResponse = response.headers.get("Set-Cookie");

  if (cookiesResponse) {
    const individualCookies = cookiesResponse.split(/,(?=\S+=[^;]+)/g);

    individualCookies.forEach((cookieString) => {
      const [cookieNameValue, ...cookieAttributes] = cookieString.split(';');
      const [name, value] = cookieNameValue.split('=');

      // Configuring the cookie using the API of Next.js.
      cookie.set(name.trim(), value.trim(), {
        // Setting the cookie's attributes.
        httpOnly: true,
        secure: true,
      });
    });
  }

  return res;
}
