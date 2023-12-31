import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
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
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
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

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('userSignIn should return an authentication response', async () => {
    const userDto = {
      email_id: 'komall@gmail.com',
      mobile_no: '9878976789',
      id: 1,
      name: 'komal',
      password: 'komal',
    };
    const authResponse = await appController.signIn(userDto);
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

    const result = await appController.createUser(userDto);
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

    const result = await appController.updateUser(userDto);
    expect(result).toEqual('Update user info successfully');
  });
});
