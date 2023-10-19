import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/lib/prisma";
import {Role, User} from "@prisma/client";


export default async function getUser(req: NextApiRequest, res: NextApiResponse){
	const data = req.body;
	const id = data.id
	console.log(`id : ${id}`)
	const user = await prisma.test.findMany()
	console.log(user)
	return res.status(200).json(user)
}


async function deleteUser(req: NextApiRequest, res: NextApiResponse){
	const data = req.body;
	const id = data.id;
	const deleteUser = await prisma.user.delete({
		where: {
			id: id
		}
	})
	return res.json(deleteUser)
}

async function getAllUsers(req: NextApiRequest, res: NextApiResponse){
	const allUsers = await prisma.user.findMany()
	return res.json(allUsers)
}

async function createUser(req: NextApiRequest, res: NextApiResponse){
	const data: User = req.body;
	const {user_name, email, password, article_number, article_frequency, format, theme} = data;
	const newUser = await prisma.user.create({
		data: {
			user_name: user_name,
			email: email,
			password: password,
			type: Role.USER,
		}
	})
}





