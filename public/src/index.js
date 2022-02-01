
// Import dependencies
import * as computerData from './dataAccess/computerData.js';
import * as eventData from './dataAccess/eventData.js';

/*
  Functions used to update the index page view
*/

// page element where rows will be inserted 
const eventRows = document.getElementById('eventRows');
const computerList = document.getElementById('computerList');

// This function returns a Bootstrap alert class and icon based on event level
// alerts - https://getbootstrap.com/docs/5.0/components/alerts/
// icons - https://icons.getbootstrap.com/
//
function getAlertStyle(level) {
  // objects to store style settings for each level
  const error = {
    alert: 'alert alert-danger',
    icon: 'bi bi-bug-fill'
  };
  const warning = {
    alert: 'alert alert-warning',
    icon: 'bi bi-exclamation-triangle'
  };
  const information = {
    alert: 'alert alert-light',
    icon: 'bi bi-info-circle-fill'
  };

  // Use Switch to return style based on level
  switch (level) {
    case 'error':
      return error;
    case 'warning':
      return warning;
    case 'information':
      return information;
    default:
      return '';
  }
}

// Display event objects in a table element
//
function displayEventList(events) {
  // Use the Array map method to iterate through the array of message documents
  // Each message will be formated as HTML table rows and added to the array
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Finally the output array is inserted as the content into the <tbody id="productRows"> element.
  const tableRows = events.map(event => {
    // Get the styling object for this level - for use below
    const levelStyle = getAlertStyle(event.level);
    return `<tr class="${levelStyle.alert}">
          <td data-toggle="tooltip" title="event id=${event.id}"><i class="${levelStyle.icon}"></i></td>
          <td>${event.type}</td>
          <td>${event.level}</td>
          <td>${event.timeStamp}</td>
          <td>${event.service}</td>
          <td data-toggle="tooltip" title="computer_id=${event.computer_id}">${event.computers.name}</td>
          <td>${event.user}</td>
          <td>${event.description}</td>
      </tr>`;
  });

  // Add rows to the table body
  eventRows.innerHTML = tableRows.join('');
}

// Display the computer links in the left menu
//
function displayComputerList(computers) {
  // Returns an HTML link for each computer  in the array
  const compLinks = computers.map(comp => {
    // The link has an onclick handler which will call updateEventsView(id)
    // passing the computer id as a parameter
    return `<button data-computer_id="${comp.id}"
            class="list-group-item list-group-item-action computer-link"> 
            ${comp.name}
            </button>`;
  });

  // use unshift to add a 'Show all' link at the start of the array of compLinks
  if (Array.isArray(compLinks)) {
    compLinks.unshift(`<button data-computer_id="0" 
                        class="list-group-item list-group-item-action computer-link">
                        All Computers
                      </button>`);
  }

  // Set the innerHTML of the computerList element = the links contained in complinks
  computerList.innerHTML = compLinks.join('');

  // Add Event listeners
  //
  // 1. Find button all elements with matching class name
  const compButtons = document.getElementsByClassName('computer-link');

  // 2. Assign a 'click' event listener to each button
  // Both arrays have same length so only need 1 loop
  for (let i = 0; i < compButtons.length; i++) {
    compButtons[i].addEventListener('click', filterEventsView);
  }

}

// 1. Get events for a given computer id
// 2. Display the events found
//
async function filterEventsView() {

  // Get id of cat link (from the data attribute)
  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  const compId = Number(this.dataset.computer_id);
  let events;

  // validation - if 0 or NaN reload everything
  if (isNaN(compId) || compId == 0) {
    events = await eventData.getAllEvents();
  } else {

    events = await eventData.getEventsByComputerId(compId);
    console.log(events);
  }
  displayEventList(events);
}

// Get JSON array of events
// Then pass that data for display
//
async function loadAndDisplayData() {
  // load all events and display
  // use the event repository to get the data
  const events = await eventData.getAllEvents();
  console.log('events:', events);
  displayEventList(events);

  // Load all computers and display
  // use the computer repository to get the data
  const computers = await computerData.getAllComputers();
  // Display the data (function in this file)
  displayComputerList(computers);
  console.log('computers: ', computers);
}


// Update page with AJAX call ever 5000ms
//
function doPoll() {
  loadAndDisplayData();
  setTimeout(doPoll, 5000);
}

export {
  loadAndDisplayData,
  filterEventsView,
  doPoll
}

// Load data
loadAndDisplayData();
//doPoll();