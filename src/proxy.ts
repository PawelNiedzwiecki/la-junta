import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (pathname === "/") {
		return NextResponse.redirect(new URL("/es", request.url));
	}
}

export const config = {
	matcher: ["/((?!_next|favicon.ico|images|menu).*)"],
};
