import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm"
import { Organization } from "./Organization"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number
    @Column({
        unique: true, nullable: true
    })
    google_id!: string
    @Column()
    name!: string
    @Column({
        unique: true
    })
    email!: string
    @Column({
        nullable: true
    })
    hash!: string
    @Column({
        nullable: true
    })
    salt!: string
    @ManyToMany(type => Organization, org => org.owners)
    @JoinTable()
    owns !: Organization[]
}