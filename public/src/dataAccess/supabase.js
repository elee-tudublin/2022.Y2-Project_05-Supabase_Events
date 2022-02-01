/*
  Supabase configuration.
*/

const supabaseUrl = 'https://hkpphovkobfbjqtqkvwy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDEyOTgzMCwiZXhwIjoxOTM1NzA1ODMwfQ.oCacU8SVPF-Oj0EEaWo8jRw8-oDL_6mAhyP1y_bJyPE';

// Supabase is imported in index.html
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('Supabase Instance: ', supabase);


export  {
  supabase
};

