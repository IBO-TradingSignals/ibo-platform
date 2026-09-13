import { Injectable } from '@nestjs/common';
import { HealthResponse } from './health-response.interface';

@Injectable()
export class HealthService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      version: this.getVersion(),
    };
  }

  private getVersion(): string {
    return process.env.npm_package_version ?? process.env.IBO_BACKEND_VERSION ?? '0.0.0';
  }
}
