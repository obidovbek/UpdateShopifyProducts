import React, { useContext } from "react"
import { AuthContext } from "../context"
import { Routes, Navigate, Route } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../router";
// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log('isAuth', isAuth)
    if(isLoading){
        return (<div>Yuklanish...</div>)
    }

    return (
        isAuth ? 
        <Routes>
            {privateRoutes.map(route=>
                <Route
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                ></Route>
            )}
            {/* <Navigate to="/dashboard"  /> */}
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route=>
                <Route
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                ></Route>
            )}
        </Routes>
    )

}

export default AppRouter