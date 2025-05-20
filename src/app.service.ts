import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const appName = this.configService.get('app.name', 'Default App');
    const serverPort = this.configService.get('app.server.port', 3000);
    const dbConfig = this.configService.get('app.database', {});

    return `Hello from ${appName}! Running on port ${serverPort} with database config: ${JSON.stringify(dbConfig)}`;
  }
}
