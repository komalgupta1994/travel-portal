import { Injectable } from '@nestjs/common';
import { redisConfig } from './redis.config';
import { Observable, Observer } from 'rxjs';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  redisSubscriber: Redis;
  redisConfig: Redis;

  constructor() {
    this.redisSubscriber = new Redis(redisConfig);

    this.redisConfig = new Redis(redisConfig)
    this.redisConfig.on('ready', () => {
      this.redisConfig.config('SET', 'notify-keyspace-events', 'Ex');
    })
  }

  redisExpiredFunction(): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      this.redisSubscriber.subscribe('__keyevent@0__:expired');
      this.redisSubscriber.on('message', async (channel, message) => {
        const [type, key] = message.split(":");
        observer.next(key);
      })

      return () => {
        observer.complete();
        this.redisSubscriber.unsubscribe();
      };
    })

  }

  setKey(key, value, expire) {
    this.redisConfig.multi().set(`${key}`, value)
      .expire(`${key}`, expire)
      .exec();
  }

  deleteKey(key: string) {
    this.redisConfig.del(key)
  }
}
