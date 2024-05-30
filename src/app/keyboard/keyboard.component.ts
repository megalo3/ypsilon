import { AfterViewInit, Component } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
    selector: 'app-keyboard',
    standalone: true,
    imports: [],
    templateUrl: './keyboard.component.html',
    styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent implements AfterViewInit {
    value = '';
    commonKeyboardOptions = {
        onChange: (input: string) => this.onChange(input),
        onKeyPress: (button: string) => this.onKeyPress(button),
        theme: 'simple-keyboard hg-theme-default hg-layout-default',
        physicalKeyboardHighlight: true,
        syncInstanceInputs: true,
        mergeDisplay: true,
        debug: true,
    };
    keyboard: Keyboard | undefined;
    keyboardArrows: Keyboard | undefined;

    ngAfterViewInit() {
        this.keyboard = new Keyboard('.simple-keyboard-main', {
            ...this.commonKeyboardOptions,
            /**
             * Layout by:
             * Sterling Butters (https://github.com/SterlingButters)
             */
            layout: {
                default: [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
                    '{tab} q w e r t y u i o p [ ] \\',
                    "{capslock} a s d f g h j k l ; ' {enter}",
                    '{shiftleft} z x c v b n m , . / {shiftright}',
                ],
                shift: [
                    '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
                    '{tab} Q W E R T Y U I O P { } |',
                    '{capslock} A S D F G H J K L : " {enter}',
                    '{shiftleft} Z X C V B N M < > ? {shiftright}',
                ],
            },
            display: {
                '{escape}': 'esc ⎋',
                '{tab}': 'tab ⇥',
                '{backspace}': 'backspace ⌫',
                '{enter}': 'enter ↵',
                '{capslock}': 'caps lock ⇪',
                '{shiftleft}': 'shift ⇧',
                '{shiftright}': 'shift ⇧',
                '{controlleft}': 'ctrl ⌃',
                '{controlright}': 'ctrl ⌃',
                '{altleft}': 'alt ⌥',
                '{altright}': 'alt ⌥',
                '{metaleft}': 'cmd ⌘',
                '{metaright}': 'cmd ⌘',
            },
        });

        this.keyboardArrows = new Keyboard('.simple-keyboard-arrows', {
            ...this.commonKeyboardOptions,
            layout: {
                default: ['{arrowup}', '{arrowdown}'],
            },
        });
    }

    onChange = (input: string) => {
        this.value = input;
        console.log('Input changed', input);
    };

    onKeyPress = (button: string) => {
        console.log('Button pressed', button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (
            button === '{shift}' ||
            button === '{shiftleft}' ||
            button === '{shiftright}' ||
            button === '{capslock}'
        )
            this.handleShift();
    };

    onInputChange = (event: any) => {
        this.keyboard?.setInput(event.target.value);
    };

    handleShift = () => {
        let currentLayout = this.keyboard?.options.layoutName;
        let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

        this.keyboard?.setOptions({
            layoutName: shiftToggle,
        });
    };
}
