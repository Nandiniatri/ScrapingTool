// import { supabase } from "./supabaseClient.js"

// async function getUsers() {
//   const { data, error } = await supabase
//     .from('users')
//     .select('*') // sab column fetch karega

//   if (error) {
//     console.error('Fetch error:', error)
//   } else {
//     console.log('Users list:', data)
//   }
// }

// // Test call
// getUsers()


import { supabase } from './supabaseClient.js';

async function addUser(name, email) {
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }])
        .select(); // 👈 yaha .select() lagao

    if (error) {
        console.error('Insert error:', error);
    } else {
        console.log('Inserted user:', data);
    }
}

addUser('Anita', 'anita@example.com');
