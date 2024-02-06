import { createClient } from '@supabase/supabase-js'
import { supabaseUrlKey, supabaseKey_ANON} from './config';


const supabaseUrl = supabaseUrlKey;
const supabaseKey = supabaseKey_ANON;

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;


