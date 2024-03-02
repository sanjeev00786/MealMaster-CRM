import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import supabase from './supabase';
import DriverDashboard from './pages/driver/driver-dashboard/driver-dashboard';
import DriverLogin from './pages/driver/driver-login/driver-login'
import PastDeliveries from './pages/driver/past-deliveries/past-deliveries';
import MealSettingPage from './pages/provider/meal-plan/meal-plan';
import DeliveryScheduleTable from './pages/provider/delivery-schedule/delivery-schedule';
import MealPlanListPage from './pages/provider/meal-plan/meal-plan-list';
import CustomerForm from './pages/provider/customer/CustomerPage1';
import DriverPage from './pages/provider/drivers/add-driver';
import DriverForm from './pages/provider/drivers/add-driver-form';

const PrivateRoute = ({ component: Component, session, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      session ? <Component {...props} /> : <Navigate to="/login" />
    }
  />
);
const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error fetching session:', error.message);
      }
    };
    const authStateChangeHandler = (_event, session) => {
      setSession(session);
    };
    fetchSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(authStateChangeHandler);
    return () => subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
  return (
  <Router>
  <div className="App">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Use Navigate instead of Redirect */} 
      <Route
        path="/drivers"
        element={session ? <DriverPage /> : <Navigate to="/drivers" />}
      />
      <Route
        path="/add-driver"
        element={session ? <DriverForm /> : <Navigate to="/add-driver" />}
      />
      <Route
        path="/meal-plan"
        element={session ? <MealSettingPage /> : <Navigate to="/meal-plan" />}
      />
      <Route
        path="/driver_login"
        element={session ? <DriverLogin /> : <Navigate to="/driver_login" />}
      />
      <Route
        path="/driver_dashboard"
        element={ <DriverDashboard /> }
      />
      <Route
        path="/past_deliveries"
        element={ <PastDeliveries /> }
      />
      <Route
        path="/driver_login"
        element={ <DriverLogin /> }
      />
      <Route
        path="/delivery-schedule"
        element={ <DeliveryScheduleTable /> }
      />
      <Route
        path="/meal-plan-list"
        element={session ? <MealPlanListPage /> : <Navigate to="/meal-plan-list" />}
      />
      <Route
        path="/customers"
        element={session ? <CustomerForm /> : <Navigate to="/customers" />}
      />
      {/* <PrivateRoute path="/dashboard" component={CustomerTable} session={session} />
          <PrivateRoute path="/customers" component={Customers} session={session} />
          <PrivateRoute path="/track-deliveries" component={TrackDeliveries} session={session} />
          <PrivateRoute path="/delivery-schedule" component={DeliverySchedule} session={session} />
          <PrivateRoute path="/social-media" component={SocialMedia} session={session} />
          <PrivateRoute path="/drivers-dashboard" component={Drivers} session={session} />
          <PrivateRoute path="/drivers-past-deliveries" component={Drivers} session={session} /> */}
        <Route path="/" element={<Navigate to={session ? '/dashboard' : '/login'} />} />

    </Routes>
  </div>
  </Router>
  );
};
export default App;