// "use server"

import {NextRequest} from "next/server";
import {getServerSession} from "next-auth";

import prisma from '@/components/db/prisma'

export { default } from "next-auth/middleware"

export const config = { matcher: ["/rbac/test", "/admin/:path*", "/student/:path*"] }