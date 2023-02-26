export class _Toast {
    message: string;
    time: number;
    type: string;

    constructor(message: string, time: number, type: string) {
        this.message = message;
        this.time = time;
        this.type = type;
    }
}