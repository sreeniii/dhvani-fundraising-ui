import { Donation } from './donation';

export class Event {
    eventId: string;
    name: string;
    date: Date;
    description: string;
    target: number;
    fundsRaised: number;
    status: string;
    statusCode: string;
    donation: [Donation] | null;
}

export class CreateEvent {
    name: string;
    date: Date;
    description: string;
    target: number;
}
