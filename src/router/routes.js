
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Index'), 
      footer: () => import('components/Footer')
    }
  },
  {
    path: '/Empleados',
    name: 'Empleados',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Empleados'), 
      footer: () => import('components/Footer')
    }
  },
  {
    path: '/Ingreso',
    name: 'Ingreso',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Ingreso'), 
      footer: () => import('components/Footer')
    }
  },
  {
    path: '/Deducciones',
    name: 'Deducciones',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Deducciones'), 
      footer: () => import('components/Footer')
    }
  },
  {
    path: '/Transacciones',
    name: 'Transacciones',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Transacciones'), 
      footer: () => import('components/Footer')
    }
  },
  {
    path: '/Asientos',
    name: 'Asientos',
    components: {
      header: () => import('components/Header'),
      sidebar: () => import('components/Sidebar'),
      default: () => import('pages/Asientos'), 
      footer: () => import('components/Footer')
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
