import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Visitors Activity',
        icon: 'people-outline',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'NGO Analytics',
        icon: 'home-outline',
        link: '/pages/charts/d3',
    },
    {
        title: 'NGO Statistics',
        icon: 'hash-outline',
        link: '/pages/iot-dashboard',
    },
];
