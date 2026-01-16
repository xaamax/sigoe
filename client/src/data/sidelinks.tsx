import {
  IconLayoutDashboard,
  IconAlertTriangle,
} from '@tabler/icons-react'
import { JSX } from 'react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Ocorrências',
    label: '',
    href: '/ocorrencias',
    icon: <IconAlertTriangle size={18} />,
  },
]
