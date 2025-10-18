import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('me')
export class MeController {
    constructor(private readonly httpService: HttpService) {}

    @Get()
    async getProfile() {
        try {
            const res = await firstValueFrom(
                this.httpService.get('https://catfact.ninja/fact', {
                    timeout: 5000,
                }),
            );

            const fact = res.data.fact ?? "No fact found";

            return {
                status: "success",
                user: {
                    "email": "h.menna85@gmail.com",
                    "name": "Menna Hassan",
                    "stack": "NestJS"
                },
                timestamp: new Date().toISOString(),
                fact: fact
            }
        } catch (err) {
            console.log('error fetching fact: ', err);

            return {
                status: "failed",
                user: {
                    "email": "h.menna85@gmail.com",
                    "name": "Menna Hassan",
                    "stack": "NestJS"
                },
                timestamp: new Date().toISOString,
                fact: 'Error fetching cat fact'
            }
        }
    }
}
