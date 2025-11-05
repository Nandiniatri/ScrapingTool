import { supabase } from "./supabaseClient"

async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*') // sab column fetch karega

  if (error) {
    console.error('Fetch error:', error)
  } else {
    console.log('Users list:', data)
  }
}

// Test call
getUsers()
