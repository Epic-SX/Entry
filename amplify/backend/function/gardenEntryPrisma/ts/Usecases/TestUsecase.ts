import TestDomainModel from '../DomainModels/TestDomainModel'
import PrismaRepository from '../Services/PrismaRepository'

const repository = new PrismaRepository()

export default class TestUsecase{
  get = async(id:number) => {
    const testDomainModel = new TestDomainModel(id,repository)

    const result = await testDomainModel.get()
    return testDomainModel.value
  }
}