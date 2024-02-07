import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import supabase from './supabase';

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
    <div className="App">
      {session ? (
        <div>
          <p>Welcome, {session.user.email}!</p>
          {/* Add your authenticated content here */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default App;

