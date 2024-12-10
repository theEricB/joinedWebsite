let portButton;   // the open/close port button
let webserial;
let currentA = 0;
let currentB = 0;
let currentC = 0;

function getValue(data, char) {
  let values = [];
  let indexChar = 0;
  let number = "";
  for (let i = 0; i < data.length; i++) {
      if (indexChar == 2) {
          number = parseFloat(number) / 1023;
          number = Math.round(number * 100) / 100
          if (! isNaN(number)){
            return number;
          }
          
      }
      if (data[i] === char) {
          indexChar += 1;
      }
      else if (indexChar == 1) {
          number += data[i];
      }
  }
}

function setup() {
  webserial = new WebSerialPort();
  if (webserial) {
    webserial.on("data", serialRead);
     // port open/close button:
     portButton = document.getElementById("portButton");
     portButton.addEventListener("click", openClosePort);
   }
}

async function openClosePort() {
  // label for the button will change depending on what you do:
  let buttonLabel = "Open port";
  // if port is open, close it; if closed, open it:
  if (webserial.port) {
    await webserial.closePort();
  } else {
    await webserial.openPort();
    buttonLabel = "Close port";
  }
  // change button label:
  portButton.innerHTML = buttonLabel;
}

function serialRead(event) {
    // var out = event.detail.data.split("\n");
    let data = event.detail.data;
    
    let newA = getValue(data, "A");
    if (typeof(newA) != "undefined"){
      currentA = newA;
    };
    let newB = getValue(data, "B");
    if (typeof(newA) != "undefined"){
      currentB = newB;
    };
    let newC = getValue(data, "C");
    if (typeof(newC) != "undefined"){
      currentC = newC;
    };

    document.getElementById("sliderX").innerHTML = currentA.toString();
    document.getElementById("sliderY").innerHTML = currentB.toString();
    document.getElementById("sliderZ").innerHTML = currentC.toString();

    // console.log(typeof(currentA), typeof(currentB), typeof(currentC));
    // console.log(currentA, currentB, currentC);

  }

// run the setup function when all the page is loaded:
document.addEventListener("DOMContentLoaded", setup);