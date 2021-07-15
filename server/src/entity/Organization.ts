import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./Lesson";
import { User } from "./User";

@Entity()
export class Organization{
    @PrimaryGeneratedColumn()
    org_id !: number
    @Column({length: 60})
    org_name !: string
    @Column()
    org_description !: string
    @ManyToMany(type => User, user => user.owns)
    owners !: User[]
    @OneToMany(type => Lesson, lesson => lesson.course)
    lessons !: Lesson[]

}