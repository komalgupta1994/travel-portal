import { IsNotEmpty, IsNumber } from "class-validator";

export class BookingDto {
    @IsNotEmpty({
        message: 'room id should not be empty'
    })
    @IsNumber()
    room_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    check_in_date: Date;

    @IsNotEmpty()
    check_out_date: Date;
}