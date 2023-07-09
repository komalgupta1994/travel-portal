import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({name: 'bookings'})
export class Booking {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false})
    room_id: number;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userIdMap: User;

    @Column({ nullable: false })
    check_in_dt: Date;

    @Column({ nullable: false })
    check_out_dt: Date;
    
    @Column({ nullable: false })
    room_qt: number;

    @Column({nullable: false })
    status: string;

    @Column()
    invoice_id: number;
    // booking: { id: number; };

    // @ManyToOne(() => Room)
    // @JoinColumn({name: 'room_id', referencedColumnName: 'id'})
    // room: Room;
}