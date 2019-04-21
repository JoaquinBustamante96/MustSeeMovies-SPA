import { trigger, state, query, group, style, transition, animate } from '@angular/animations';

export class Animations {

    public static slideInOut = trigger('slideInOutAnimation', [
        state('*', style({
        })),
        transition(':enter', [
            style({
                transform: 'translateX(100%)',
                opacity: 0
            }),
            animate('.3s ease-in-out', style({
                transform: 'translateY(0)',
                opacity: 1
            }))
        ]),
        transition(':leave', [
            animate('.3s ease-in-out', style({
                transform: 'translateX(-100%)',
                opacity: 0
            }))
        ])
    ]);

    public static fadeIn = trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(400, style({ opacity: 1 })),
        ]),
        transition(':leave', [
            animate(0, style({ opacity: 0 }))
        ])]);

    public static slideUpDown = trigger('slideUpDown', [
        transition(':enter', [
            style({ height: 0 }),
            animate('5s ease-in-out', style({ height: '*' })),
        ]),
        transition(':leave', [
            animate('5s ease-in-out', style({ height: 0 }))
        ])
    ]);

    public static routeAnimation = trigger('routeAnimation', [
        transition('1 => 2, 2 => 3', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('3 => 2, 2 => 1', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
    ])

}