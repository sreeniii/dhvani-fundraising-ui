export class Event {
    eventId: string;
    name: string;
    date: Date;
    description: string;
    target: number;
}

export class CreateEvent {
    name: string;
    date: Date;
    description: string;
    target: number;
}
