document.addEventListener("DOMContentLoaded", function(event) { 
  loopInterval = undefined;
  var DOMTime = document.querySelector('.textarea-tempo'),
  DOMCounter = document.querySelector('.textarea-timer');

  DOMTime.onclick = function(){ this.value = ""; }
  
  document.body.onkeyup = function(){
    var DOMTime = document.querySelector('.textarea-tempo'),
    DOMCounter = document.querySelector('.textarea-timer');

    if(!loopInterval) {

      var arrValues = DOMTime.value.split(':');

      if(arrValues[1] > 59){
        document.querySelector('[name="inputDinamica"]').value = "Nome da dinâmica";
        document.querySelector('.textarea-timer').value = "00:00";
        DOMTime.value = "00:00";
        alert("O valor dos segundos deve ser abaixo de 60.");
        return;
      }

      if(arrValues[0] && arrValues[1]){
        for(i = 0; i < arrValues.length; i++){
          if(arrValues[i].length <= 1)
            arrValues[i] = "0" + arrValues[i];
        }
        
        var strJoined = arrValues[0] + ':' + arrValues[1];      
        var numTime = strJoined == "" ? "00:00" : strJoined;
        DOMCounter.value = numTime;
      }

    }
  }

  oTimer = new classTimer(DOMCounter);
});
