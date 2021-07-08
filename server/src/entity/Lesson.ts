import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id!: number
    @Column()
    content !: string
    @ManyToOne(type => Course, course => course.lessons)
    course!: Course
}
