import express from "express";
import { getRepository } from 'typeorm'
import { Course } from "../entity/Course";
import { Lesson } from "../entity/Lesson";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";

const apiRouter = express.Router()

apiRouter.get('/org/:orgname', async (req, res) => {
    const orgname = req.params.orgname.toLowerCase()
    const orgRepo = getRepository(Organization)
    const queryBuilder = orgRepo.createQueryBuilder('organization').where("LOWER(org_name) LIKE :query", { query: `%${orgname}%` })
    const queryResults = await queryBuilder.getMany()
    console.log(queryResults)
    res.send(queryResults)
})


apiRouter.post('/createorganization', async (req: any, res) => {
    if (req.isAuthenticated()) {
        const org_name = req.body.org_name
        const org_description = req.body.org_description
        try {
            const organization = new Organization()
            organization.org_name = org_name
            organization.owners = [req.user]
            organization.org_description = org_description
            const orgRepo = getRepository(Organization)
            await orgRepo.save(organization)
            const userRepo = getRepository(User)
            userRepo.save(req.user)
            res.status(201).send({ msg: "Organization created." })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Could not create organization." })
        }
    } else {
        res.status(401).send()
    }
})

apiRouter.post('/createlesson', async (req: any, res) => {
    // if (!req.isAuthenticated()) {
    //     res.status(401).send()
    // }
    try {
        const lesson_title = req.body.lesson_title 
        const lesson_content = req.body.lesson_content
        const lesson_courseid = req.body.lesson_courseid
        const courseRepo = getRepository(Course)
        const lessonRepo = getRepository(Lesson)
        const course = await courseRepo.findOneOrFail({course_id: lesson_courseid})
        const lesson = new Lesson()
        lesson.title = lesson_title
        lesson.content = lesson_content
        lesson.course = course 
        lessonRepo.save(lesson)
        console.log('saved lesson: ', lesson)
        res.status(201).send()
        
    } catch (error) {
        console.error(error)
        res.status(400).send()
    }

})


apiRouter.get('/lesson/:lessonid', async (req: any, res) => {
    console.log("Got a request for lesson id: ", req.params.lessonid)
    try {
        const lessonID = req.params.lessonid
        const lessonRepo = getRepository(Lesson)
        const lesson = await lessonRepo.findOne({ lesson_id: lessonID })
        if (!lesson) res.status(404).send()
        console.log("Sending lesson:", lesson)
        res.send(lesson)
    } catch (error) {
        res.status(404).send()
    }
})


export default apiRouter