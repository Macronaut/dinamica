function classTimer(p_DOMCounter) {
  this.numCounter = p_DOMCounter.value;
  this.DOMCounter = p_DOMCounter;
  this.update = this.update;
  if(localStorage.getItem("strSave")){ strSave = localStorage.getItem("strSave"); } 
  else { strSave = ""; }

  if(strSave) document.querySelector('.list-dinamica tbody').innerHTML += strSave;
    
  numDiffMinutes = 0;
  numDiffSeconds = 0;  
  numCurrent = 0;
  strTotal = "";

  VMasker(document.querySelector(".textarea-tempo")).maskPattern("99:99");  

  document.querySelector('.pausar').disabled = true;
  document.querySelector('.parar').disabled = true;  

  document.querySelector('[name="inputDinamica"]').onclick = function(event) {
    if(this.value == "Nome da dinâmica")
      this.value = "";
  };
}

classTimer.prototype.update = function(p_DOMCounter, p_numMinutes, p_numSeconds) {
  numCurrent++;
  document.querySelector('.progress-timer').value = numCurrent;

  if(numDiffSeconds < 60) {
    numDiffSeconds++;
  } else {
    numDiffSeconds = 0;
    numDiffMinutes++;
  }

  if(p_numSeconds > 0) { p_numSeconds--; }
  else {
    if(p_numMinutes > 0) {
      p_numSeconds = 59;
      p_numMinutes--;
    } else {
      oTimer.stop();
    }
  }  

  p_numSeconds = p_numSeconds.toString().length <= 1 ? ( "0" + p_numSeconds ) : p_numSeconds;
  p_numMinutes = p_numMinutes.toString().length <= 1 ? ( "0" + p_numMinutes ) : p_numMinutes;
  p_DOMCounter.value = p_numMinutes + ":" + p_numSeconds;  
}

classTimer.prototype.start = function() {
  strTotal = document.querySelector('.textarea-tempo').value;  
  this.numCounter = this.DOMCounter.value;
  strDinamica = document.querySelector('[name="inputDinamica"]').value.trim();  

  if(this.numCounter == "00:00" || strDinamica == "Nome da dinâmica" || strDinamica == "") {
    document.querySelector('[name="inputDinamica"]').value = "Nome da dinâmica";
    document.querySelector('.textarea-tempo').value = "00:00";
    if(strDinamica == "Nome da dinâmica" || strDinamica == ""){ var strMessage = "Atenção: Por favor insira um nome para a dinâmica."; } 
    else { var strMessage = "Atenção: Por favor insira um número correto para o contador de tempo."; }

    this.DOMCounter.value = "00:00";
    delete this.numCounter;
    delete strDinamica;
    window.alert(strMessage);
    return;
  }

  document.querySelector('[name="inputDinamica"]').disabled = true;
  document.querySelector('.textarea-tempo').disabled = true;

  document.querySelector('.arrow-group .decrease').classList.add('disabled');
  document.querySelector('.arrow-group .raise').classList.add('disabled');

  var numMinToSec = strTotal.split(':')[0] * 60,
  numSec = strTotal.split(':')[1],
  numProgressMax = Number(numMinToSec) + Number(numSec);

  document.querySelector('.progress-timer').max = numProgressMax;
  
  var arrButtons = document.querySelectorAll('.button-group .item');
  document.querySelector('.pausar').disabled = false;
  document.querySelector('.iniciar').disabled = true;
  document.querySelector('.parar').disabled = false;

  loopInterval = setInterval(function() {
    var numCounter = document.querySelector('.textarea-timer').value,
    DOMCounter = document.querySelector('.textarea-timer'),
    numMinutes = numCounter.split(':')[0],
    numSeconds = numCounter.split(':')[1];

    oTimer.update(DOMCounter, numMinutes, numSeconds);
  }, 1000);
}

classTimer.prototype.hold = function() {
  var strHTML = document.querySelector('.pausar').innerHTML;

  if(strHTML == "PAUSAR") {
      clearInterval(loopInterval);
      document.querySelector('.pausar').innerHTML = "RESUMIR";
  } else {
    document.querySelector('.pausar').innerHTML = "PAUSAR";
    loopInterval = setInterval(function() {
      var numCounter = document.querySelector('.textarea-timer').value,
      DOMCounter = document.querySelector('.textarea-timer'),
      numMinutes = numCounter.split(':')[0],
      numSeconds = numCounter.split(':')[1];

      oTimer.update(DOMCounter, numMinutes, numSeconds);
    }, 1000);
  }
}

classTimer.prototype.stop = function(p_Pausar) {
  document.querySelector('.iniciar').disabled = false;
  clearInterval(loopInterval);

  var numCounter = document.querySelector('.textarea-timer').value,
  DOMCounter = document.querySelector('.textarea-timer'),
  numMinutes = numCounter.split(':')[0],
  numSeconds = numCounter.split(':')[1];
  
  if(!p_Pausar) numDiffSeconds--;
  
  var numDuracaoMinutes = numDiffMinutes.toString().length <= 1 ? ("0" + numDiffMinutes) : numDiffMinutes,
  numDuracaoSeconds = numDiffSeconds.toString().length <= 1 ? ("0" + numDiffSeconds) : numDiffSeconds,
  strDuracao = numDuracaoMinutes + ':' + numDuracaoSeconds;

  var numChildren = document.querySelector('.list-dinamica tbody').children.length;

  var strHTML = '<tr class="list-item">'
  +  '<td class="item montserrat-regular color-text">'+ numChildren +'</td>'
  +  '<td class="item montserrat-regular color-text">'+ strDinamica +'</td>'
  +  '<td align="right" class="item montserrat-regular color-text">'+ strDuracao +'</td>'
  + '</tr>';
    
  loopInterval = undefined;  
  numDiffMinutes = 0;
  numDiffSeconds = 0;
  numCurrent = 0;
  strTotal = "";

  strSave += strHTML;
  localStorage.setItem("strSave", strSave);

  document.querySelector('.progress-timer').value = 0;
  document.querySelector('.progress-timer').max = 100;

  document.querySelector('[name="inputDinamica"]').disabled = false;
  document.querySelector('.textarea-tempo').disabled = false;

  document.querySelector('[name="inputDinamica"]').value = "Nome da dinâmica";
  document.querySelector('.textarea-tempo').value = "00:00";
  document.querySelector('.textarea-timer').value = "00:00";

  document.querySelector('.list-dinamica tbody').innerHTML += strHTML;
  document.querySelector('.pausar').innerHTML = "PAUSAR";

  document.querySelector('.pausar').disabled = true;
  document.querySelector('.iniciar').disabled = false;
  document.querySelector('.parar').disabled = true;

  document.querySelector('.arrow-group .decrease').classList.remove('disabled');
  document.querySelector('.arrow-group .raise').classList.remove('disabled');

  delete strDinamica;  
}

classTimer.prototype.manageTime = function(p_oButton){
  var strAction = p_oButton.getAttribute('data-action'),
  inputCounter = document.querySelector('.textarea-timer'),
  inputTime = document.querySelector('.textarea-tempo'),  
  numMinutes = Number(inputTime.value.split(':')[0]),
  numSeconds = Number(inputTime.value.split(':')[1]);  
  

  switch(strAction) {
    case "raise":
      if(numSeconds < 59) { numSeconds++; } 
      else {
        numSeconds = 0;
        numMinutes++;        
      }
    break;
    case "decrease":
     if(numSeconds > 0){
      numSeconds--;
     } else {      
      if(numMinutes > 0){
        numMinutes--;
        numSeconds = 59;
      }
     }
    break;    
  }

  if(numMinutes.toString().length <=1 ) numMinutes = "0" + numMinutes;
  if(numSeconds.toString().length <=1 ) numSeconds = "0" + numSeconds;
    
  inputTime.value = numMinutes + ":" + numSeconds;
  inputCounter.value = numMinutes + ":" + numSeconds;
}
