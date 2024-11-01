import PrismaRepository from '../../Services/PrismaRepository'
import {Prisma} from '@prisma/client'

const repository = new PrismaRepository()

describe('PrismaRepository',()=>{
  test('データ取得',async() => {

    const child = await repository.getTestData(29)

    expect(child.last_name).toBe('市川')
  })
})
