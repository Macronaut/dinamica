function classTimer(p_DOMCounter) {
  this.numCounter = p_DOMCounter.value;
  this.DOMCounter = p_DOMCounter;
  this.update = this.update;

  document.querySelector('.pausar').disabled = true;
  document.querySelector('.parar').disabled = true;

  document.querySelector('[name="inputDinamica"]').onclick = function(event) {
    if(this.value == "Nome da dinâmica")
      this.value = "";
  };
}

classTimer.prototype.update = function(p_DOMCounter, p_numMinutes, p_numSeconds) {
  if(p_numSeconds > 0) { p_numSeconds--; }
  else {
    if(p_numMinutes > 0) {
      p_numSeconds = 60;
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
  numTotal = document.querySelector('input[type="time"]').value;
  document.querySelector('input[type="time"]').value = "";
  this.numCounter = this.DOMCounter.value;
  strDinamica = document.querySelector('[name="inputDinamica"]').value.trim();
  document.querySelector('[name="inputDinamica"]').value = "";

  if(this.numCounter == "00:00" || strDinamica == "Nome da dinâmica" || strDinamica == "") {
    this.DOMCounter.value = "00:00";
    delete this.numCounter;
    delete strDinamica;
    delete numTotal;
    window.alert("Atenção : Por favor insira as informações necessárias corretamente!");
    return;
  }


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

classTimer.prototype.stop = function() {
  document.querySelector('.iniciar').disabled = false;
  clearInterval(loopInterval);

  var numCounter = document.querySelector('.textarea-timer').value,
  DOMCounter = document.querySelector('.textarea-timer'),
  numTotalMinutes = numTotal.split(':')[0],
  numTotalSeconds = numTotal.split(':')[1],
  numMinutes = numCounter.split(':')[0],
  numSeconds = numCounter.split(':')[1],

  // Consertar lógica dos minutos + segundos, não é a diferença e sim o tempo que passou //

  numDiffMinutes = Math.abs(Number(numTotalMinutes) - Number(numMinutes)),
  numDiffSeconds = Math.abs(Number(numTotalSeconds) - Number(numSeconds));

  numDiffMinutes = numDiffMinutes.toString().length <= 1 ? ("0" + numDiffMinutes) : numDiffMinutes;
  numDiffSeconds = numDiffSeconds.toString().length <= 1 ? ("0" + numDiffSeconds) : numDiffSeconds;
  var strDuracao = numDiffMinutes + ':' + numDiffSeconds;

  document.querySelector('[name="inputDinamica"]').value = "Nome da dinâmica";
  document.querySelector('.textarea-timer').value = "00:00";
  var numChildren = document.querySelector('.list-dinamica tbody').children.length;

  var strHTML = '<tr class="list-item">'
  +  '<td class="item color-text">'+ numChildren +'</td>'
  +  '<td class="item color-text">'+ strDinamica +'</td>'
  +  '<td align="right" class="item color-text">'+ strDuracao +'</td>'
  + '</tr>';

  loopInterval = undefined;

  document.querySelector('.list-dinamica tbody').innerHTML += strHTML;
  document.querySelector('.pausar').innerHTML = "PAUSAR";

  document.querySelector('.pausar').disabled = true;
  document.querySelector('.iniciar').disabled = false;
  document.querySelector('.parar').disabled = true;

  document.querySelector('[name="inputTempo"]').value = "";

  delete strDinamica;
  delete numTotal;
}
