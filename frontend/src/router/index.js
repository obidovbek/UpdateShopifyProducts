import Login from '../views/pages/login/Login'
import DefaultLayout from '../layout/DefaultLayout'
import Page404 from '../views/pages/page404/Page404'
import Page500 from '../views/pages/page500/Page500'
import Register from '../views/pages/register/Register'

export const privateRoutes = [
    { path: '*', element: <DefaultLayout />, exact: true },
]

export const publicRoutes = [
    { path: '*', element: <Login />, exact: true },
    { path: '/register', element: <Register />, exact: true },
    { path: '/404', element: <Page404 />, exact: true },
    { path: '/500', element: <Page500 />, exact: true },
]