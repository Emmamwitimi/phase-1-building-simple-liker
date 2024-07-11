// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
// Add hidden to error modal
document.getElementById('modal').classList.add('hidden');

// Function to handle heart click
function heartClickHandler(event) {
  const heart = event.target;
  
  // Check if the clicked element is a heart
  if (heart.classList.contains('like-glyph')) {
    mimicServerCall()
      .then(() => {
        // On success, toggle the heart state
        if (heart.classList.contains('activated-heart')) {
          heart.innerText = EMPTY_HEART; // Empty heart
          heart.classList.remove('activated-heart');
        } else {
          heart.innerText = FULL_HEART; // Full heart
          heart.classList.add('activated-heart');
        }
      })
      .catch((error) => {
        // On failure, display the error modal
        const modal = document.getElementById('modal');
        document.getElementById('modal-message').innerText = error;
        modal.classList.remove('hidden');

        // Hide the error modal after 3 seconds
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 3000);
      });
  }
}

// Add event listener to the document to capture all heart clicks
document.addEventListener('click', heartClickHandler);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
