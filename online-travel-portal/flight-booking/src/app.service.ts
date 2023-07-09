import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFlight(): string {
    return 'Hello from flight booking!!';
  }
}
