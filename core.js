window.onload = function() {
  loopInterval = undefined;
  var DOMTime = document.querySelector('input[type="time"]'),
  DOMCounter = document.querySelector('.textarea-timer');

  DOMTime.onchange = function(event) {
    if(!loopInterval) {
      var numTime = event.target.value == "" ? "00:00" : event.target.value;
      DOMCounter.value = numTime;
    }
  };

  oTimer = new classTimer(DOMCounter);
}
