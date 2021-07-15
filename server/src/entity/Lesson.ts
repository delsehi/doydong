import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { MultipleChoice } from "./Question";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id!: number
    @Column()
    title !: string
    @Column()
    content !: string
    @ManyToOne(type => Course, course => course.lessons)
    course!: Course
    @OneToMany(type => MultipleChoice, question => question.lesson)
    questions!: MultipleChoice[]
}
