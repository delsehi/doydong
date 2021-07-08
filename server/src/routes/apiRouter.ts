import express from "express";
import { getRepository } from 'typeorm'
import { Lesson } from "../entity/Lesson";
import { Organization } from "../entity/Organization";

const apiRouter = express.Router()

apiRouter.get('/org/:orgname', async (req, res) => {
    const orgname = req.params.orgname.toLowerCase()
    const orgRepo = getRepository(Organization)
    const queryBuilder = orgRepo.createQueryBuilder('organization').where("LOWER(org_name) LIKE :query", {query: `%${orgname}%`})
    const queryResults = await queryBuilder.getMany()
    console.log(queryResults)
    res.send(queryResults)
})


apiRouter.get('/lesson/:lessonID', async (req: any, res) => {
    console.log('Got a request for a lesson')
    const lessonID = req.params.lessonID
    const lessonRepo = getRepository(Lesson)
    const lesson = await lessonRepo.findOne({lesson_id: lessonID})
    res.send(lesson)
})


export default apiRouter