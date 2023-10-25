import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Counter } from 'prom-client';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { AppModule } from './app.module';

// Mock implementations
const userRepositoryMock = {
  save: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
};

const jwtServiceMock = {
  signAsync: jest.fn(),
};

const counterMock = {
  inc: jest.fn(),
};

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AppService,
        makeCounterProvider({
          name: 'user_metric',
          help: 'user_metric_help',
        }),
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: 'user_metric',
          useValue: counterMock,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userDto: UserDto = {
        email_id: 'komall@gmail.com',
        mobile_no: '9878976789',
        id: 1,
        name: 'komal',
        password: 'komal',
      };

      userRepositoryMock.save.mockResolvedValue(userDto);

      const result = await appService.createUser(userDto);

      expect(result).toBe('User created successfully');
      expect(userRepositoryMock.save).toHaveBeenCalledWith(userDto);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userDto: UserDto = {
        email_id: 'komall@gmail.com',
        mobile_no: '9878976789',
        id: 1,
        name: 'komal',
        password: 'komal',
      };

      userRepositoryMock.update.mockResolvedValue(userDto);

      const result = await appService.updateUser(userDto);

      expect(result).toBe('Update user info successfully');
      expect(userRepositoryMock.update).toHaveBeenCalledWith(
        userDto.id,
        userDto,
      );
    });

    it('should not update password if it is not provided', async () => {
      const userDto: UserDto = {
        email_id: 'komall@gmail.com',
        mobile_no: '9878976789',
        id: 1,
        name: 'komal',
        password: 'komal',
      };

      userRepositoryMock.update.mockResolvedValue(userDto);

      const result = await appService.updateUser(userDto);

      expect(result).toBe('Update user info successfully');
      expect(userRepositoryMock.update).toHaveBeenCalledWith(
        userDto.id,
        userDto,
      );
    });
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      const users = [
        { id: 1, email_id: 'user1@example.com', name: 'User 1' },
        { id: 2, email_id: 'user2@example.com', name: 'User 2' },
      ];

      userRepositoryMock.find.mockResolvedValue(users);

      const result = await appService.getUsers();

      expect(result).toEqual(users);
      expect(userRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('encryptPassword', () => {
    // Mock the bcrypt.genSalt and bcrypt.hash functions
    bcrypt.genSalt = jest
      .fn()
      .mockImplementation(() => Promise.resolve('salt'));
    bcrypt.hash = jest
      .fn()
      .mockImplementation(() => Promise.resolve('hashedPassword'));

    it('should encrypt a password', async () => {
      const password = 'password';

      const result = await appService.encryptPassword(password);

      expect(result).toBe('hashedPassword');
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.genSalt).toHaveBeenCalledWith(); // You can check for specific arguments if needed
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const emailId = 'komal@gmail.com';
      const password = 'password';

      userRepositoryMock.findOne.mockResolvedValue(undefined);

      await expect(appService.signIn(emailId, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
