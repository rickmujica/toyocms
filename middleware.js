import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./app/lib/token";

let redirectToLogin = false;
export async function middleware(request) {
 
    let token;
    if (request.cookies.has("token")) {
      token = request.cookies.get("token")?.value;
    } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
      token = request.headers.get("Authorization")?.substring(7);
    }
  
    if (request.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
      return;

    if (!token) {

    return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = NextResponse.next();
    // Verificar y decodificar el token

    try {
      if (token) {
        const { sub } = await verifyJWT(token);
        response.headers.set("X-USER-ID", sub);
        request.user = { id: sub };
      }
    } catch (error) {
      redirectToLogin = true;
      if (request.nextUrl.pathname.startsWith("/api")) {
        return getErrorResponse(401, "Token es invalido o usuario not existe");
      }
  
      return NextResponse.redirect(
        new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, request.url)
      );
    }

const authUser = request.user;
    // console.log("ACA VIENE EL authUser!!!!!!!!!!!!!!", authUser)

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        request.url
      )
    );
  }
  if (request.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
