import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'I think you are on wrong way,,,';
  }

  getLatest(): string {
    return 'here is latest build';
  }
}
