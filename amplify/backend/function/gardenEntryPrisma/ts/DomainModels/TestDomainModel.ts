import IRepository from '../Services/IRepository'

export default class TestDomainModel {
  id:number
  value:any
  repository:IRepository

  constructor(id:number=null,repository:IRepository){
    this.id = id
    this.repository = repository
  }

  get = async() => {
    if(this.id != null){
      this.value = await this.repository.getTestData(this.id)
    }
  }
}
