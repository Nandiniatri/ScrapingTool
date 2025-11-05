import { supabase } from './supabaseClient.js'

async function addUser(name, email) {
  const { data, error } = await supabase
    .from('users')
    .insert({ name: name, email: email })
  
  if (error) console.error('Insert error:', error)
  else console.log('Inserted user:', data)
}

addUser('Anita', 'anita@example.com');

