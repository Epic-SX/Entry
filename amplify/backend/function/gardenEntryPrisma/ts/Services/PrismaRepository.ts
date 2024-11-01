import { PrismaClient,Prisma } from '@prisma/client'
import IRepository from '../Services/IRepository'

const dbUrl = "mysql://"+process.env.DB_USER
  +":"+process.env.DB_PASSWORD
  +"@"+process.env.DB_HOST
  +":"+process.env.DB_PORT
  +"/"+process.env.DB_SCHEMA
  +"??connection_limit=1"

const getPrismaClient = () => {
  return new PrismaClient({
    datasources:{
      db:{url:dbUrl}
    }
  })
}
const prisma = getPrismaClient()

export default class PrismaRepository implements IRepository{
  getTestData = async(id:number) => {
    const result = await prisma.childs.findUnique({where:{id:id}})
    return result
  }
}
