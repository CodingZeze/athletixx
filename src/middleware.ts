import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest & { nextauth: any }) {
    // Check if user is admin for admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Check if user is authenticated for protected routes
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/favorites") ||
      req.nextUrl.pathname.startsWith("/api/favorites") ||
      req.nextUrl.pathname.startsWith("/api/users")
    ) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const publicRoutes = ["/login", "/signup", "/", "/api/auth"];
        const isPublicRoute = publicRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        if (isPublicRoute) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/favorites/:path*",
    "/api/favorites/:path*",
    "/api/users/:path*",
    "/api/admin/:path*",
  ],
};
