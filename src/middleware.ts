// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req,
      // secret: process?.env?.NEXTAUTH_SECRET,
      // // cookieName: ACCESS_TOKEN, // next-auth.session-token,
      // secureCookie: true,
      raw: true
    });

    // console.log("----req.url---", req.url);

    // console.log("------req.nextauth.token-----", req.nextauth.token?.is_admin);
    // if (req.nextUrl.pathname.startsWith("/admin") && !req.nextauth.token?.is_admin)
    //   return NextResponse.rewrite(new URL("/auth/login", req.url));
    // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.is_admin)
    //   return NextResponse.rewrite(new URL("/auth/login", req.url));
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        const token1 = await getToken({
          req,
          // secret: process?.env?.NEXTAUTH_SECRET,
          // cookieName: ACCESS_TOKEN, // next-auth.session-token
          raw: true
        });

        console.log("----token-getToken---", token1);
        // console.log("---req----", req)
        console.log("---token----", !!token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [],
  // matcher: ["/admin/:path*", "/user/:path*"],
};

// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware(req) {
//     console.log("----req----", req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log("---token", token)
//         return token?.role === "admin"}
//     },
//   }
// )

// export const config = { matcher: ["/admin/:path*"] }
