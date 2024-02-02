import {NextRequest} from "next/server";

export { default } from "next-auth/middleware"

export function checkAdmin (req: NextRequest){

}

export const config = { matcher: ["/rbac/test", "/admin/:path*"] }