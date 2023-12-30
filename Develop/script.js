// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let today = dayjs().format("dddd, MMMM D YYYY");

let now = dayjs().format("H A");

$('#currentDay').text(today);

let timeSection = [
  { time: "9 AM",
    event: ''},
  { time: "10 AM",
    event: ''},
  { time: "11 AM",
    event: ''},
  { time: "12 PM",
    event: ''},
  { time: "1 PM",
    event: ''},
  { time: "2 PM",
    event: ''},
  { time: "3 PM",
    event: ''},
  { time: "4 PM",
    event: ''},
  { time: "5 PM",
    event: ''},
]

$(function () {
  var events = JSON.parse(localStorage.getItem('workDay'));
  
  if (events) {
    timeSection = events;
  }

  $('#currentDay').text(today);
  
  timeSection.forEach(function(timeBlock, index) {
    let timeLabel = timeBlock.time;
    let blockColor = colorRow(timeLabel); 

    
    let row = 
          '<div class ="time-block" id="' +
          index +
          '"><div class="row no gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
          timeLabel +
          '</div><textarea class="form-control ' +
          blockColor +
          '">' +
          timeBlock.event +
          '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save" ></i></button></div></div>';
          
          $(".container-lg").append(row);
        });

        function colorRow(time) {
    let doNow = dayjs(now, 'H A');
    let doEntry = dayjs(time, 'H A');
    if (doNow.isBefore(doEntry) === true) {
      return "future"
    } else if (doNow.isAfter(doEntry) === true ) {
      return "past";
    } else {
      return "present";
    }
  }
  
  $('.saveBtn').on('click', function () {
    let blockID = parseInt(
      $(this)
      .closest('.time-block')
      .attr('id')
      );
      let userEntry = $.trim(
        $(this)
      .parent()
      .siblings('textarea')
      .val()
      );
      timeSection[blockID].event = userEntry;
      
      localStorage.setItem('workDay', JSON.stringify(timeSection));
      
      displaySuccess()
      
    });
    
    function displaySuccess() {
      let appointmentBox = document.querySelector('#successBox');
      appointmentBox.classList.remove('hidden');
      appointmentBox.classList.add('unhidden');
      
      setTimeout(function () {
        appointmentBox.classList.remove('unhidden');
        appointmentBox.classList.add('hidden');
      }, 2000);
    }
    // var timeSection = $('.time-block');
    // var timeBlockHour = timeBlock.attr('id').split('-')[1];
    // var currentHour = dayjs().hour();
    
    // console.log(currentHour);
  // var btns = $('.time-block button');
  
  // function storeEvent() {
    //   var btn = $(this);
    //   var textarea = btn.prev();
    //   var parentDiv = btn.parent();
    
    //   var id = parentDiv.attr('id');
    //   var textareaElement = document.getElementById(id);
    
    //   // textarea.addEventListener('input', function() {
      //     var text = $(textareaElement).val(); 
      //     // localStorage.setItem('textareaValue', text)
      
      // }
      
      // saveButton.addEventListener("click", function() {
        
        //   var time = timeBlock.getAttribute("data-time");
        //   var message = textareaValue.value;
        
        //   var event = {
          //     time: time,
  //     message: message
  //   };

  //   var eventString = JSON.stringify(event);

  //   localStorage.setItem(time, eventString);
  // });
  // var date = dayjs().format('YYYY');
  
  
  // btns.click(storeEvent);
  // Grab the textarea
  // Get Textarea's value
  // Get the parentDiv id
  // Store the value to the localStorage corresponging with the hour(ie. hour-9)
  // Show an alert that the event was saved 
  // if (hour == 9) {
  //   console.log('yep');
  // }
  // Add "past" to time block that has already passed
  // console.log(date);
  
  // console.log(id);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
