import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
// import CustomerTable from './components/Dashboard';
import supabase from './supabase';

const PrivateRoute = ({ component: Component, session, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      session ? <Component {...props} /> : <Redirect to="/login" />
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
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/driver-login" component={Login} /> */}
          <Route path="/signup" component={SignUp} />
          {/* <PrivateRoute path="/dashboard" component={CustomerTable} session={session} />
          <PrivateRoute path="/customers" component={Customers} session={session} />
          <PrivateRoute path="/track-deliveries" component={TrackDeliveries} session={session} />
          <PrivateRoute path="/delivery-schedule" component={DeliverySchedule} session={session} />
          <PrivateRoute path="/social-media" component={SocialMedia} session={session} />
          <PrivateRoute path="/drivers-dashboard" component={Drivers} session={session} />
          <PrivateRoute path="/drivers-past-deliveries" component={Drivers} session={session} /> */}
          <Redirect from="/" to={session ? '/dashboard' : '/login'} />
        </Switch>
      </div>
    </Router>
  );
};