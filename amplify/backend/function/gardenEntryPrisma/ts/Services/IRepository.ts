export default interface IRepository {
	getTestData(id:number):Promise<any>
}