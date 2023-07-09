import { Blob } from 'buffer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, JoinTable } from 'typeorm';
import { Hotel } from './hotel.entity';
import { Booking } from './booking.entity';

@Entity({name: 'rooms'})
export class Room {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    hotel_id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    quantity: number;
    
    @Column({ nullable: false })
    price: number;

    @Column({default: true, nullable: false })
    is_active: boolean;

    @ManyToOne(() => Hotel)
    @JoinColumn({name: 'hotel_id', referencedColumnName: 'id'})
    hotel: Hotel;
    // @JoinColumn({name: 'hotel_id'})

    // @OneToMany(() => Booking, booking => booking.room)
    // bookings: Booking[];
}