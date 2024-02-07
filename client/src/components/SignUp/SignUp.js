import './SignUp.css'; // Create a CSS file for your SignUp component styles
import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../supabase';

export default function SignUp() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateUser = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: username,
        password: password,
      });

      if (error) {
        console.error('Error creating user:', error.message);
      } else {
        console.log('User created successfully:', user);
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

  const providers = []; // Customize this array based on your needs

  if (!session) {
    return (
      <div className="signup-container">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={providers} />
        <div>
          <h2>Create New User</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button onClick={handleCreateUser}>Register</button>
        </div>
      </div>
    );
  } else {
    return <div className="signup-container">Logged in!</div>;
  }
}
