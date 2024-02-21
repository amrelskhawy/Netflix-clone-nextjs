import bcrypt from "bcrypt"
import Prismadb from "@/libs/prismadb";
import { NextApiResponse } from "next"
import {NextResponse} from "next/server";


export const GET = (req: Request) => {

  return new Response('Bad Request', {status: 405})
}


export const POST = async (req: Request) => {
  try {
    // const {email, username, password} = req.body
    // console.log({email, username, password} )
    return new NextResponse('Hello Post', {
      status: 200
    })

  } catch (error: any) {

  }


}