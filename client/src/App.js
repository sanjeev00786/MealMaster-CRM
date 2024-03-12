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
import EditDriverForm from './pages/provider/drivers/edit-driver-form';

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
            path="/drivers"
            element={session ? <DriverPage /> : <Navigate to="/drivers" />}
          />
          <Route
            path="/add-driver"
            element={session ? <DriverForm /> : <Navigate to="/add-driver" />}
          />
          <Route
            path="/edit-driver"
            element={session ? <EditDriverForm /> : <Navigate to="/edit-driver" />}
          />
          <Route
            path="/trackdeliveries"
            element={session ? <TrackDeliveries /> : <Navigate to="/trackdeliveries" />}
          />
          <Route
            path="/dashboard"
            element={session ? <Dashboard /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/customers"
            element={session ? <CustomerForm /> : <Navigate to="/customers" />}
          />
          <Route
            path="/meal-plan"
            element={session ? <MealSettingPage /> : <Navigate to="/meal-plan" />}
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
            path="/delivery-schedule"
            element={<DeliveryScheduleTable />}
          />
          <Route
            path="/meal-plan-list"
            element={session ? <MealPlanListPage /> : <Navigate to="/meal-plan-list" />}
          />
          <Route
            path="/meal-plan-update/:plan_id"
            element={session ? <MealPlanUpdatePage /> : <Navigate to="/meal-plan-update" />}
          />
          <Route
            path="/customerList"
            element={session ? <CustomerPage /> : <Navigate to="/customerList" />}
          />

          <Route
            path="/social-media"
            element={session ? <SocialMedia /> : <Navigate to="/social-media" />}
          />
          <Route path="/" element={<Navigate to={session ? '/dashboard' : '/auth'} />} />

        </Routes>
      </div>
    </Router>
  );
};
export default App;