"use server"

import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'

export default async function StudentHomePage() {

    return (
        <div>
            halo
        </div>
    )
}