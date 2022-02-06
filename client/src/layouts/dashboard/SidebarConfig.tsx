import { Icon, IconifyIcon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
  {
    title: 'appointments',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'get appointment',
    path: '/dashboard/get-appointment',
    icon: getIcon(peopleFill),
  },
  {
    title: 'prescriptions',
    path: '/dashboard/prescriptions',
    icon: getIcon(shoppingBagFill),
  },
];

export default sidebarConfig;
