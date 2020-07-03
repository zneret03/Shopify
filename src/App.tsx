import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Spin} from 'antd';
import {AuthProvider} from './auth/AuthProvider'

//components
const Home = lazy(() => import('./page/Home'));
const Shop = lazy(() => import('./page/Shop'));
const Dashboard = lazy(() => import('./page/Dashboard'));
const PublicRoute = lazy(() => import('./layouts/public/PublicRoute'));
const PrivateRoute = lazy(() => import('./layouts/private/PrivateRoute'));
const App:React.SFC = () => {

  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <AuthProvider>
        <Router>
          <div>
            <PublicRoute exact={true} path="/" component={Home}/>
            <PublicRoute exact={true} path="/shop" component={Shop}/>
            <PrivateRoute exact={true}  path="/dashboard" component={Dashboard}/>
          </div>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
