const { createClient } = require("@supabase/supabase-js");

console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log("SUPABASE KEY EXISTS:", !!process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;