import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Discover from '../views/Discover'

/**

 * 采用配置式路由而非 JSX 元素式，便于后续加懒加载：
 * { path: '/playlist/:id', lazy: () => import('../views/Playlist') }
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Discover />,
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}