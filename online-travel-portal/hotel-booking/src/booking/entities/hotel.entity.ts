import { Blob } from 'buffer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { Room } from './room.entity';

@Entity({name: 'hotels'})
export class Hotel {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    location: string;
    
    @Column()
    description: string;

    @Column({ type: 'longblob' })
    image: Buffer;

    @Column({default: true, nullable: false })
    is_active: boolean;

    @OneToMany(() => Room, room => room.hotel)
    rooms: Room[];
}