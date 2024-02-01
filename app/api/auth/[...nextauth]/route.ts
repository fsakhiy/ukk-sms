import NextAuth, {User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../../components/db/prisma"
import {PrismaAdapter} from "@auth/prisma-adapter";
import * as bcrypt from "bcrypt"

// import {PrismaClient} from "@prisma/client";

// const prisma  = new PrismaClient()

const handler = NextAuth({
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your username"},
                password: { label: "Password", type: "password", placeholder: "your password"}
            },
            async authorize(
                credentials, req
            ){
                if(!credentials?.username == null || !credentials?.password == null) {
                    // throw new Error('credentials error')
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials?.username
                    }
                })

                if(!user) {
                    // throw new Error('credentials error')
                    return null
                }

                // @ts-ignore
                const isCorrect = await bcrypt.compare(credentials.password, user.password)


                if(!isCorrect) {
                    // throw new Error('credentials error')
                    return null
                }


                const sessionUser: User = {
                    id: user.id.toString(),
                    name: user.username,
                }
                
                return sessionUser
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 10000
    },
    // pages: {
    //     signIn: '/auth/login'
    // }
    theme: {
        colorScheme: "light",
        brandColor: "#912626",
    },

})

export { handler as GET, handler as POST }