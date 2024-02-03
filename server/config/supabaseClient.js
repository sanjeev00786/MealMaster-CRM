require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_KEY:', supabaseKey);

if (!supabaseUrl) {
    throw new Error('SUPABASE_URL is required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;