import React, { Component, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Switch } from 'react-router-dom'
import './scss/style.scss'
import { AuthContext } from './context'
import AppRouter from './components/AppRouter'
import authService from './services/AuthService'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
          const fetchData = async ()=>{
            const user = await authService.autologin();
            console.log('user', user)
            if(user){setIsAuth(true);}
            setLoading(false);
          }
          fetchData();
        }else{
          setLoading(false);
        }
      }, [])

    return (
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}>
        <HashRouter>
          <Suspense fallback={loading}>
                <AppRouter />
          </Suspense>
        </HashRouter>
      </AuthContext.Provider>
    )
}

export default App
