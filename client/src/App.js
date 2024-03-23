import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
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
import Dashboard from './pages/provider/dashboard/dashboard';
import MealPlanUpdatePage from './pages/provider/meal-plan/meal-plan-update'
import CustomerPage from './pages/provider/customer/customer';
import SocialMedia from './pages/provider/social-media/social-media';
import TrackDeliveries from './pages/provider/track-deliveries/track-deliveries'
import TrackDriver from './pages/provider/track-deliveries/track-driver/track-driver';
import LandingPage from './pages/LandingPage/LandingPage';
import EditDriverForm from './pages/provider/drivers/edit-driver-form';
import LoginPage from './pages/provider/authentication/login-page';
import EditCustomerForm from "./pages/provider/customer/EditCustomerForm";

const PrivateRoute = ({ component: Component, session, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      session ? <Component {...props} /> : <Navigate to="/auth" />
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

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(authStateChangeHandler);

    // Unsubscribe when component unmounts
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
          <Route path="/auth" element={<Login />} />

          <Route
            path="/login-page"
            element={<LoginPage />}
          />

          <Route
            path="/drivers"
            element={session ? <DriverPage /> : <Navigate to="/drivers" />}
          />
          <Route
            path="/add-driver"
            element={session ? <DriverForm /> : <LoginPage />}
          />
          <Route
            path="/edit-driver"
            element={session ? <EditDriverForm /> : <LoginPage />}
          />
          <Route
            path="/trackdeliveries"
            element={session ? <TrackDeliveries /> : <LoginPage />}
          />
           <Route
            path="/trackDriver/:driverID" 
            element={<TrackDriver />}
          />
          <Route
            path="/dashboard"
            element={session ? <Dashboard /> : <LoginPage />}
          />
          <Route
            path="/customers"
            element={session ? <CustomerForm /> : <LoginPage />}
          />
          <Route
            path="/meal-plan"
            element={session ? <MealSettingPage /> : <LoginPage />}
          />
          <Route
            path="/driver_dashboard"
            element={<DriverDashboard />}
          />
          <Route
            path="/past_deliveries"
            element={<PastDeliveries />}
          />
          <Route
            path="/driver_login"
            element={<DriverLogin />}
          />
          <Route
            path="/delivery-schedule/:page"
            element={session ? <DeliveryScheduleTable /> : <LoginPage /> }
          />
          <Route
            path="/meal-plan-list"
            element={session ? <MealPlanListPage /> : <LoginPage />}
          />
          <Route
            path="/meal-plan-update/:plan_id"
            element={session ? <MealPlanUpdatePage /> : <LoginPage />}
          />
          <Route
            path="/customerList/:page"
            element={session ? <CustomerPage /> : <LoginPage />}
          />
          <Route
            path="/edit-customer/:customerId"
            element={
              session ? <EditCustomerForm /> : <Navigate to="/customerList" />
            }
          />

          {/* <Route
            path="/social-media"
            element={session ? <SocialMedia /> : <Navigate to="/social-media" />}
          /> */}
          <Route path="/" element={<Navigate to={session ? '/dashboard' : '/landing-page'} />} />
          <Route
            path="/landing-page"
            element={<LandingPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};
export default App;