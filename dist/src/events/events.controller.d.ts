import { EventsService } from './events.service';
import { JwtService } from '@nestjs/jwt';
export declare class EventsController {
    private eventsService;
    private jwtService;
    constructor(eventsService: EventsService, jwtService: JwtService);
    getAll(): Promise<any>;
    create(body: any, auth: string): Promise<any>;
    attend(id: string, auth: string): Promise<{
        attending: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
