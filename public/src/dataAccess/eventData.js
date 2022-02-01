/*
  Functions used to work with Event related data
*/

// Get a db connection
import { supabase } from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllEvents() {

    // define variable to store events
    let events;

    // execute request
    // Note await in try/catch block
    try {
      // Execute the SQL
      const result = await supabase
        .from('events')
        .select('*, computers(name)');

      // first element of the recordset contains products
      events = await result.data;
      //console.log('events: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all events: ", error.message);
    } finally {
    }
    // return all products found
    return events;
}

// Get event by id
//
async function getEventById(id) {
  let event;

  // execute
  // Note await in try/catch block
  try {
    const result = await supabase
      .from('events')
      .select('*')
      .eq('id', id);

    event = result.data;

    // Catch and log errors to server side console
  } catch (err) {
    console.log("Supabase Error - get event by id: ", err.message);
  } finally {
  }
  // return first product found
  return event[0];
}

//
// Get all events for a computer by (computer) id
//
async function getEventsByComputerId(compId) {
    // define variable to store events
    let events;

    // execute
    try {
      const result = await supabase
        .from('events')
        .select('*, computers(name)')
        .eq('computer_id', compId);

      // first element of the recordset contains products
      events = result.data;
      
      // Catch and log errors to server side console
    } catch (err) {
      console.log('Supabase Error - get events by computer_id: ', err.message);
    } finally {
    }
    // return all products found
    return events;
}

// Export
export {
  getAllEvents,
  getEventById,
  getEventsByComputerId
};
