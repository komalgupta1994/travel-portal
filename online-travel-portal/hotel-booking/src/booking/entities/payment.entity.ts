import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Booking } from './booking.entity';

@Entity({name: 'payments'})
export class Payment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false})
    booking_id: number;

    // @OneToOne(type => Booking, booking => booking.id)
    // booking_id: Booking;

    @Column()
    status: string;

    @Column({ nullable: false })
    amount: number;
}