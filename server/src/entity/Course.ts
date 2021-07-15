import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./Lesson";


@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    course_id!: number
    @Column({length: 50})
    course_title!: string
    @Column("text")
    description!: string
    @OneToMany(type => Lesson, lesson => lesson.course)
    lessons!: Lesson[]
}
