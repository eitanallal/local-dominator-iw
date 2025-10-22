import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('health')
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('metrics')
  async getMetrics(): Promise<string> {
    return this.metricsService.getMetrics();
  }
}
