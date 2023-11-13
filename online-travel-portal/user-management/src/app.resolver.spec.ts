import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './app.resolver';
import { AppService } from './app.service';

// Mock implementations
class AppServiceMock {
  async createUser(userDto) {
    return 'User created successfully';
  }

  async updateUser(userDto) {
    return 'Update user info successfully';
  }

  async findUser(email) {
    return { id: 1, email_id: email, name: 'Test User' };
  }

  async getUsers() {
    return [{ id: 1, email_id: 'user1@example.com', name: 'User 1' }];
  }

  async signIn(emailId, password) {
    return {
      access_token: 'mockAccessToken',
    };
  }
}

class JwtServiceMock {
  async signAsync(payload) {
    return 'mockAccessToken';
  }
}

class CounterMock {
  // Implement methods and properties as needed for testing
}

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: AppService,
          useClass: AppServiceMock, // Use the mock implementation
        },
        {
          provide: 'JwtService',
          useClass: JwtServiceMock, // Use the mock implementation
        },
        {
          provide: 'PrometheusCounter',
          useClass: CounterMock, // Use the mock implementation
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  it('getUsers should return an array of users', async () => {
    const users = await userResolver.getUsers();
    expect(users).toHaveLength(1); // Check the expected number of users
    expect(users[0].name).toEqual('User'); // Check user data
  });

  it('getUserById should return a user by email_id', async () => {
    const user = await userResolver.gerUserById('user1@example.com');
    expect(user).toBeDefined();
    expect(user.name).toEqual('Test User');
  });

  it('userSignIn should return an authentication response', async () => {
    const authResponse = await userResolver.userSignIn(
      'user1@example.com',
      'password123',
    );
    expect(authResponse.access_token).toEqual('mockAccessToken');
  });

  it('createUser should return a success message', async () => {
    const userDto = {
      email_id: 'komall@gmail.com',
      mobile_no: '9878976789',
      id: 1,
      name: 'komal',
      password: 'komal',
    };

    const result = await userResolver.createUser(userDto);
    expect(result).toEqual('User created successfully');
  });

  it('updateUser should return a success message', async () => {
    const userDto = {
      email_id: 'komall@gmail.com',
      mobile_no: '9878976789',
      id: 1,
      name: 'komal',
      password: 'komal',
    };

    const result = await userResolver.updateUser(userDto);
    expect(result).toEqual('Update user info successfully');
  });
});
