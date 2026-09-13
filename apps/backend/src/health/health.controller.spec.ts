import { beforeEach, describe, expect, it } from 'vitest';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('Health', () => {
  let service: HealthService;
  let controller: HealthController;

  beforeEach(() => {
    service = new HealthService();
    controller = new HealthController(service);
  });

  it('should return status ok with a version', () => {
    const result = controller.getHealth();
    expect(result.status).toBe('ok');
    expect(typeof result.version).toBe('string');
    expect(result.version.length).toBeGreaterThan(0);
  });

  it('should fall back to 0.0.0 when no version is available', () => {
    const previousNpmVersion = process.env.npm_package_version;
    const previousBackendVersion = process.env.IBO_BACKEND_VERSION;
    delete process.env.npm_package_version;
    delete process.env.IBO_BACKEND_VERSION;
    try {
      expect(service.getHealth().version).toBe('0.0.0');
    } finally {
      if (previousNpmVersion !== undefined) {
        process.env.npm_package_version = previousNpmVersion;
      }
      if (previousBackendVersion !== undefined) {
        process.env.IBO_BACKEND_VERSION = previousBackendVersion;
      }
    }
  });
});
