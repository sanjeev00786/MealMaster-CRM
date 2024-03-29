import './Login.css'; // Create a CSS file for your Login component styles
import { useState, useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../supabase';
import FinishSignUp from '../FinishSignUp/FinishSignUp';

export default function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session)
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const providers = []; 

  if (!session) {
    return (
      <div className="login-container">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={providers} />
        
</div>
    );
  } 
  else {
    // console.log(session)
    return <FinishSignUp session={session} />;
  }
}

