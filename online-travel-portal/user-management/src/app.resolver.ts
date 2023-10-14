import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
  User,
  AuthResponse,
  CreateUserInput,
  UpdateUserInput,
} from './entities/user.entity';
import { AppService } from './app.service';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(AppService) private appService: AppService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Query(() => User)
  async gerUserById(@Args('email_id') emailId: string): Promise<User> {
    return this.appService.findUser(emailId);
  }

  @Query(() => AuthResponse)
  async userSignIn(
    @Args('email_id') emailId: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    return this.appService.signIn(emailId, password);
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    return this.appService.createUser(input);
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<string> {
    return this.appService.updateUser(input);
  }
}
