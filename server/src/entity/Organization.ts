import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Organization{
    @PrimaryGeneratedColumn()
    org_id !: number
    @Column({length: 60})
    org_name !: string
  //  @Column({length: 1500})
  //  description !: string
    @ManyToMany(type => User, user => user.owns)
    owners !: User[]

}