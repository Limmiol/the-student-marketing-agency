const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(process.cwd(), '.env');
const text = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^([^=]+)=(.*)$/);
      if (!m) return null;
      return [m[1], m[2].replace(/^"|"$/g, '')];
    })
    .filter(Boolean),
);

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);

supabase
  .from('profiles')
  .select('*')
  .then((result) => {
    console.log('result:', JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error('error:', error);
  });
