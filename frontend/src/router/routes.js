export const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/journey', name: 'journey', component: () => import('@/views/JourneyView.vue') },
  { path: '/work', name: 'work', component: () => import('@/views/WorkView.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
  { path: '/collection', name: 'collection', component: () => import('@/views/CollectionView.vue') }
]
