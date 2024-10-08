import { CanActivateFn, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { NavigationService } from './navigation.service';
import { inject } from '@angular/core';
import { MapComponent } from './map/map.component';

export const AuthGuard: CanActivateFn = (): boolean => {
    return inject(NavigationService).admin;
};

export const routes: Routes = [
    {
        path: '',
        title: 'Main Menu',
        component: PageComponent,
        children: [
            {
                path: 'station-map',
                title: 'Station Map',
                component: MapComponent,
            },
            {
                path: 'diagnostics',
                title: 'Diagnostics',
                component: DiagnosticsComponent,
            },
            {
                path: 'schedule',
                title: 'Schedule',
                data: {
                    list: [
                        'Docking bay activity (past 6 months):',
                        ' ',
                        '2366-06-12.0633 - Bay 2 : Arrive :: Tempest',
                        '2366-04-29.0834 - Bay 1 : Arrive :: Heracles',
                        '2366-03-02.1223 - Bay 2 : Depart :: Key Largo',
                        '2366-02-20.1604 - Bay 2 : Arrive :: Key Largo',
                    ],
                },
                component: PageComponent,
            },
            {
                path: 'roster',
                title: 'Roster',
                data: {
                    list: [
                        '01. VERHOEVEN, Sonya :: Admin',
                        '02. SINGH, Ashraf :: Breaker',
                        '03. DE BEERS, Dana :: Lead Drill',
                        '04. CHATZKEL, Jerome :: Asst. Drill',
                        '05. TOBIN, Rosa :: Engineer',
                        '06. RADIMIR, Mikhail :: Lead Engineer',
                        '07. KANTARO, Kanji :: Loader',
                        '08. BOWE, Morgan :: Loader',
                        '09. NEKTARIOS, Ri :: Loader',
                        '10. n/a',
                    ],
                },
                component: PageComponent,
            },
            {
                path: 'comms',
                title: 'Comms',
                data: {
                    intro: ['2 vessels detected in proximity'],
                    toggleItems: [
                        {
                            name: 'HAIL TEMPEST',
                            status: 'STANDBY',
                            toggleValues: ['HAILING', 'STANDBY'],
                        },
                        {
                            name: 'HAIL HERACLES',
                            status: 'STANDBY',
                            toggleValues: ['HAILING', 'STANDBY'],
                        },
                    ],
                },
                component: PageComponent,
            },
            {
                path: 'controls',
                title: 'Controls',
                data: {
                    intro: ['[A] :: Administrator access only'],
                },
                component: PageComponent,
                children: [
                    {
                        path: 'showers',
                        title: 'Showers',
                        data: {
                            toggleItems: [
                                {
                                    name: 'Shower 1',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                                {
                                    name: 'Shower 2',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                                {
                                    name: 'Shower 3',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                                {
                                    name: 'Shower 4',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                                {
                                    name: 'Shower 5',
                                    status: 'MALFUNCTIONING',
                                    toggleValues: ['MALFUNCTIONING'],
                                    error: true,
                                },
                                {
                                    name: 'Shower 6',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                            ],
                        },
                        component: PageComponent,
                    },
                    {
                        path: 'hydroponics-lab',
                        title: 'Hydroponics Lab',
                        data: {
                            toggleItems: [
                                {
                                    name: 'Mist Hydration System',
                                    status: 'OFF',
                                    toggleValues: ['OFF', 'ON'],
                                },
                            ],
                        },
                        component: PageComponent,
                    },
                    {
                        path: 'airlocks',
                        title: 'Airlocks',
                        canActivate: [AuthGuard],
                        data: {
                            admin: true,
                            toggleItems: [
                                {
                                    name: 'Docking Bay 1',
                                    status: 'LOCKED',
                                    toggleValues: ['LOCKED', 'UNLOCKED'],
                                },
                                {
                                    name: 'Docking Bay 2',
                                    status: 'UNLOCKED',
                                    toggleValues: ['LOCKED', 'UNLOCKED'],
                                },
                            ],
                        },
                        component: PageComponent,
                    },
                    {
                        path: 'system',
                        title: 'System',
                        canActivate: [AuthGuard],
                        data: {
                            admin: true,
                        },
                        component: PageComponent,
                        children: [
                            {
                                path: 'life-support',
                                title: 'Life Support',
                                component: PageComponent,
                                data: {
                                    intro: [
                                        'WARNING: Disabling life support is a violation of company policy #2778-A.',
                                        'TANO-BAUER CORP assumes no responsibility or liabilities resulting from the improper use of this feature.',
                                    ],
                                    introWarning: true,
                                    toggleItems: [
                                        {
                                            name: 'Life Support',
                                            status: 'ENABLED',
                                            toggleValues: [
                                                'ENABLED',
                                                'DISABLED',
                                            ],
                                        },
                                    ],
                                },
                            },
                            {
                                path: 'self-destruct',
                                title: 'Self Destruct',
                                component: PageComponent,
                                data: {
                                    intro: [
                                        'WARNING: Destruction of corporate property is a violation of company policy #2778-B.',
                                        'TANO-BAUER CORP assumes no responsibility or liabilities resulting from the improper use of this feature.',
                                    ],
                                    introWarning: true,
                                    toggleItems: [
                                        {
                                            name: 'Activate Self Destruct',
                                            status: localStorage.getItem(
                                                'ypsilon-destruct'
                                            )
                                                ? 'ACTIVE'
                                                : 'INACTIVE',
                                            toggleValues: [
                                                'INACTIVE',
                                                'ACTIVE',
                                            ],
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
