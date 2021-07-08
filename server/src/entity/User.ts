import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm"
import { Organization } from "./Organization"


@Entity()
export class User {
    @PrimaryColumn()
    user_id!: string
    @Column()
    name!: string
    @ManyToMany(type => Organization, org => org.owners)
    @JoinTable()
    owns !: Organization[]
}