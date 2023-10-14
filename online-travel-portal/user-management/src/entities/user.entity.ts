import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  mobile_no: string;

  @Field()
  @Column()
  email_id: string;

  @Field()
  @Column()
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;
}

@ObjectType()
export class CreateUpdateResponse {
  @Field()
  message: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  mobile_no: string;

  @Field()
  email_id: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  mobile_no: string;

  @Field({ nullable: true })
  email_id: string;

  @Field({ nullable: true })
  password: string;
}
