import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayhello(){
    return "Hello world!"
  }
}
