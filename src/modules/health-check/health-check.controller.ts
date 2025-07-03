import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "./health-check.service";

@Controller('health')
export class HealthCheckController {
    constructor(private readonly healthCheckService: HealthCheckService) {}
    @Get()
    healthCheck(): Promise<boolean> {
       return this.healthCheckService.execute()
    }
}