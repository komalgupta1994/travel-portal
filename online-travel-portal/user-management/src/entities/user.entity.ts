// import { Booking } from 'src/booking/entities/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    mobile_no: string;
    
    @Column()
    email_id: string;

    @Column()
    password: string;
}