import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SlowTypeService {
    constructor() {}

    slowType(value: string, time: number = 30): Signal<string> {
        const slowTypeSignal = signal<string>('');
        let partialValue = '';
        const timer = setInterval(() => {
            if (value.length === partialValue.length) {
                clearTimeout(timer);
            }

            partialValue = value.slice(0, partialValue.length + 1);
            slowTypeSignal.set(partialValue);
        }, time);

        return slowTypeSignal;
    }
}
