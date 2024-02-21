import bcrypt from "bcrypt"
import Prismadb from "@/libs/prismadb";
import { NextApiResponse } from "next"
import { NextResponse } from "next/server";


export const GET = (req: Request) => {

  return new Response('Bad Request', { status: 405 })
}


export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const { email, name, password } = await req.json()
    console.log({ email, name, password })

    const existingUser = await Prismadb.user.findFirst({
      where: {
        email
      }
    })

    console.log(existingUser)

    if (existingUser) {

      return new Response('Email already taken', { status: 422 })
    }


    const hashedPassword = await bcrypt.hash(password, 12)

    console.log(hashedPassword)

    const user = await Prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    console.log(user)

    return new Response('Account has Been Created Successfully', { status: 201 })

  } catch (error: any) {
    return new Response('Error Cause of -> ' + error, { status: 500 })
  }
}
