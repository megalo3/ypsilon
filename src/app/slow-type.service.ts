import { Injectable, WritableSignal, signal } from '@angular/core';

export enum Speed {
    Normal = 30,
    Fast = 10,
    Slow = 250,
    Pause = 500,
}

@Injectable({
    providedIn: 'root',
})
export class SlowTypeService {
    constructor() {}

    slowType(
        slowTypeSignal: WritableSignal<string>,
        value: string,
        time: number = 30,
    ): WritableSignal<string> {
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

    slowTypeChain(inputs: { value: string; time: number }[]): WritableSignal<string>[] {
        const signals: WritableSignal<string>[] = [];
        inputs.forEach(() => signals.push(signal('')));
        let totalTime = 0;
        inputs.forEach((input, index) => {
            setTimeout(() => {
                this.slowType(signals[index], input.value, input.time);
            }, totalTime);
            totalTime += this.#getTypeFullTime(input.value, input.time);
        });
        return signals;
    }

    #getTypeFullTime(value: string, time: number): number {
        return time * value.length;
    }
}
