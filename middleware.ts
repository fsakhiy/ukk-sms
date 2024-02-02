// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/home', request.url))
// }
//
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// }

import {NextRequest} from "next/server";

export { default } from "next-auth/middleware"

export function checkAdmin (req: NextRequest){

}

export const config = { matcher: ["/rbac/test", "/admin/:path*"] }