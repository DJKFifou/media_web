import NextAuth, {DefaultSession} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma";
import {Role} from "@prisma/client";

/**
	* Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
	* object and keep type safety.
	*
	* @see https://next-auth.js.org/getting-started/typescript#module-augmentation
	*/
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession["user"] &
				User
	}

	interface User {
		user_name: string
		type: Role
		hasAccess?: boolean
	}
}

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	],
	callbacks: {
		session:({session, user}) => {
			return {
				...session,
				user:{
					...session.user,
					hasAccess: user.hasAccess,
					user_name: user.user_name,
					type: user.type,
					id: user.id
				}
			}
		}
	}
})
