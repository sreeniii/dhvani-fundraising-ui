export class Donation {
    donationType: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    paymentCompleted: boolean;
    comments: string;
}

export class AddDonation {
    eventId: string;
    donorId: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    amount: number;
    comments: string;
    paymentCompleted: boolean;
    donationTypeCode: string;
}
