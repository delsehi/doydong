import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./Lesson";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    question_id!: number
    @Column()
    question !: string
    @Column()
    type !: string
  //  @ManyToOne(type => Lesson, lesson => lesson.questions)
   // lesson!: Lesson
}

@Entity()
export class MultipleChoice extends Question {
    @ManyToOne(type => Lesson, lesson => lesson.questions)
    lesson!: Lesson
    @Column({type: 'json', array: false})
    choices !: {correct: string[], incorrect: string[]} // should contain correct string[] and incorrect string[]
}