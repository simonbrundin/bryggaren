

// Rubriken för vilken fas bryggningen är i

// Bryggfaser



let brewingPhases = [
  Setup = {
    Titel: 'Mät upp alla ingredienser',
    PIOs: [],
    Tid: 10
  },
  FillWater = {
    Titel: 'Fyller vatten',
    PIOs: ['r-ventil-3', 'r-pump-2'],
    Tid: 10
  },
  HeatWater = {
    Titel: 'Värmer vatten',
    PIOs: ['r-kokplatta', 'r-hlt-element', 'r-tw-g'],
    Tid: 10
  },
  TransferWaterBottom = {
    Titel: 'Botten',
    PIOs: ['r-tw-g', 'r-tw-r', 'r-ventil-1', 'r-ventil-4', 'r-pump-2', 'r-kokplatta'],
    Tid: 10
  },
  TransferWaterTop = {
    Titel: 'Toppen',
    PIOs: ['r-ventil-4', 'r-pump-1'],
    Tid: 10
  },
  Mash = {
    Titel: 'Mäskar',
    PIOs: ['r-tw-o', 'r-ventil-1', 'r-ventil-4', 'r-pump-2'],
    Tid: 10
  },
  Lauter = {
    Titel: 'Lakar',
    PIOs: ['r-tw-o', 'r-ventil-2', 'r-ventil-3', 'r-ventil-4', 'r-ventil-5', 'r-kokplatta'],
    Tid: 10
  },
  Boil = {
    Titel: 'Kokar',
    PIOs: [''],
    Tid: 10
  },
  Chill = {
    Titel: 'Kyler',
    PIOs: ['r-tw-r', 'r-ventil-2', 'r-ventil-3', 'r-ventil-4', 'r-ventil-5', 'r-kokplatta', 'r-hlt-element'],
    Tid: 10
  },
];


currentPhase = 0;

const setPhase = () => {
  changeBrewingPhaseText();
  setPIOs();
  setTimer();
  goToNextPhase();

};


const changeBrewingPhaseText = () => document.querySelector('#status-rubrik').innerHTML = brewingPhases[currentPhase].Titel;

const setPIOs = () => {
  brewingPhases[currentPhase].PIOs.forEach(element => {
    if (!element) { } else {
      const id = '#';
      let pio = element;
      document.querySelector(id + pio).classList.toggle('on');
    }

  });
};

const setTimer = () => {
  setInterval(() => {

  }, 1000);
};

const goToNextPhase = () => currentPhase++;

const goToLastPhase = () => {
  currentPhase--;
  currentPhase--;
  setPhase();
};

const waitThenSetPhase = () => {
  let waitThisManySeconds = 2;
  let milliseconds = waitThisManySeconds * 1000;
  setTimeout(setPhase, milliseconds);
};


const resetProcess = () => {
  var elements = document.querySelectorAll('.relay');

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('on');
  }

  currentPhase = 0;
  setPhase();
}


function toggleOnOff(event) {
  let element = event.target
  element.classList.toggle('on');
}

const togglePIOs = () => {
  let relays = document.querySelector('#relays');
  let buttons = document.querySelector('#rubrik-knappar');
  let piosIcon = document.querySelector('#pios-icon');
  if (relays.style.display === '') {
    relays.style.display = 'inline-block';
    buttons.style.display = 'flex';
    piosIcon.classList.toggle('fa-toggle-on')
    piosIcon.classList.toggle('fa-toggle-off')
  } else {
    relays.style.display = '';
    buttons.style.display = 'none';
    piosIcon.classList.toggle('fa-toggle-on')
    piosIcon.classList.toggle('fa-toggle-off')
  }
}

// Event Listeners
document.querySelector('#relays').addEventListener('click', toggleOnOff);
document.querySelector('#step-button').addEventListener('click', setPhase);
document.querySelector('#timer-button').addEventListener('click', waitThenSetPhase);
document.querySelector('#reset-button').addEventListener('click', resetProcess);
document.querySelector('#pios-icon').addEventListener('click', togglePIOs);
document.querySelector('#next-phase').addEventListener('click', setPhase);
document.querySelector('#last-phase').addEventListener('click', goToLastPhase);


// Starta app

setPhase();



// Nerräknare - Cirkel
var totalTid = 4 * 60 * 60;
var fasTid = 45 * 60;
var procentKlart = 100;
var procentKvar = 100 - procentKlart;
var progressBarTotal = document.querySelector('#progress-bar-total-progress');
var progressRingTotal = document.querySelector('#progress-ring-total');

progressBarTotal.style.strokeDashoffset = procentKvar;
progressBarTotal.style.transition = "stroke-dashoffset " + totalTid + "s linear";

var progressBarPhase = document.querySelector('#progress-bar-phase-progress');
progressBarPhase.style.strokeDashoffset = procentKvar;
progressBarPhase.style.transition = "stroke-dashoffset " + fasTid / (13 / 16) + "s linear";


