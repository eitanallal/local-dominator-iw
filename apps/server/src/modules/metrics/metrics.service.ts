import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: client.Registry;

  constructor() {
    this.registry = new client.Registry();

    client.collectDefaultMetrics({ register: this.registry });
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  createCounter(name: string, help: string) {
    const counter = new client.Counter({ name, help, registers: [this.registry] });
    return counter;
  }
}
