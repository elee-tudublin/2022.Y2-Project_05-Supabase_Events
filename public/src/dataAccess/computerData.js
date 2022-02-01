/*
  Functions used to work with Computer related data
*/
// Get a db connection
import {supabase} from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllComputers() {

    // define variable to store events
    let events;

    // execute request
    // Note await in try/catch block
    try {
      // Execute the SQL
      const result = await supabase.from("computers").select("*");

      // first element of the recordset contains products
      events = await result.data;
      //console.log('events: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all computers: ", error.message);
    } finally {
    }
    // return all products found
    return events;
}

// Get event by id
//
async function getComputerById(id) {
  let event;

  // execute
  // Note await in try/catch block
  try {
    const result = await supabase.from("computers").select("*").eq("_id", id);

    event = result.data;

    // Catch and log errors to server side console
  } catch (err) {
    console.log("Supabase Error - get computer by id: ", err.message);
  } finally {
  }
  // return first product found
  return event[0];
}

// Export
export {
  getAllComputers,
  getComputerById
};
