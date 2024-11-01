import TestUsecase from '../Usecases/TestUsecase'
import CustomJson from '../Services/CustomJson'

const express = require('express')
const router = express.Router()
const usecase = new TestUsecase()

router.get('/getChild', async(req, res) => {
    const result = await usecase.get(req.query.id)
    const json_result = CustomJson.stringify(result)
    res.send(json_result)
})

/*
router.post('/create', async(req, res) => {
    const result = await usecase.createStudent(req.body.student)
    res.send(CustomJson.stringify({id:result}))
})
*/

export default router
