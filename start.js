// Meny 

const $infoIcon = document.querySelector('#info-icon');
const $brewSettings = document.querySelector('#brew-settings');
$infoIcon.addEventListener('click', function () {
  $brewSettings.classList.toggle('off');
});

// Vid klick på loggan
const $logga = document.querySelector('#logga');
const $underBryggningSektion = document.querySelector('#under-bryggning');
const $startSettingsSektion = document.querySelector('#start-settings');
$logga.addEventListener('click', function () {
  if ($underBryggningSektion.style.display === "") {
    $underBryggningSektion.style.display = "block";
    $startSettingsSektion.style.display = "none";
  } else if ($underBryggningSektion.style.display === "none") {
    $underBryggningSektion.style.display = "block";
    $startSettingsSektion.style.display = "none";
  } else {
    $underBryggningSektion.style.display = "none";
    $startSettingsSektion.style.display = "block";
  }

})
// Progressbar klickbar
const $sectionChooseLiters = document.querySelector('#step-bottled-beer');
const $sectionChooseRecipe = document.querySelector('#step-choose-recipe');
const $sectionMarkIngredients = document.querySelector('#step-ingredients');
const $stepOneIcon = document.querySelector('#step-1');
const $stepTwoIcon = document.querySelector('#step-2');
const $stepThreeIcon = document.querySelector('#step-3');
$stepOneIcon.addEventListener('click', function () {
  $sectionChooseRecipe.style.display = "block";
  $sectionChooseLiters.style.display = "none";
  $sectionMarkIngredients.style.display = "none";
});
$stepTwoIcon.addEventListener('click', function () {
  $sectionChooseRecipe.style.display = "none";
  $sectionChooseLiters.style.display = "block";
  $sectionMarkIngredients.style.display = "none";
});
$stepThreeIcon.addEventListener('click', function () {
  $sectionChooseRecipe.style.display = "none";
  $sectionChooseLiters.style.display = "none";
  $sectionMarkIngredients.style.display = "block";
});

// Bryggdata ---------------------------------------------------------
const bryggData = {
  chosenRecipeObject: {},
  maxLiters: 40,
  recipeName: "",
  chosenLiters: 0,
  fermentables: [],
  mashSteps: [],
  lautering: [],
  boilTime: 0,
  hops: []
};

// Tillåt nästa steg
let step = 1;
var nextStepAllowed = false;

// Interaktioner
const advanceToNextStep = () => {

  const $progressPercent = document.querySelector('#progress');
  if (step === 1) {
    var steg = "#step-1"
    var progress = "50%"
    var removeIcon = "fa-beer"
    $sectionChooseRecipe.style.display = "none"; // Visa nästa section
    $sectionChooseLiters.style.display = "block";
  } else if (step === 2) {
    var steg = "#step-2"
    var progress = "100%"
    var removeIcon = "fa-wine-bottle"
    $sectionChooseLiters.style.display = "none"; // Visa nästa section
    $sectionMarkIngredients.style.display = "block";
    updateIngredients();
  } else if (step === 3) {
    var steg = "#step-3"
    var progress = "100%"
    const progressBar = document.querySelector('#progress-bar');
    progressBar.style.display = "none";
    $sectionMarkIngredients.style.display = "none";
    $nextButton.style.display = "none";
    $underBryggningSektion.style.display = "block";
  }
  const $stegIkon = document.querySelector(steg);
  $stegIkon.classList.remove(removeIcon);
  $progressPercent.style.width = progress;
  $stegIkon.classList.add('fa-check');
  $stegIkon.classList.add('klart-steg');
  makeButtonRed();
  step++;
  nextStepAllowed = false;
};
const displayErrorMessage = () => {
  if (step === 1) {
    alert('Välj recept')
  } else if (step === 2) {
    alert('Välj antal liter')
  } else if (step === 3) {
    alert('Köp alla ingredienser')
  };
};
const bounce = () => {
  $nextButton.classList.add('bounce');
  const slutaStudsa = () => {
    $nextButton.classList.remove('bounce')
  };
  setTimeout(slutaStudsa, 1000);

};
const makeButtonRed = () => {
  const $nextButtonText = document.querySelector('#next-button div');
  const $nextButtonIcon = document.querySelector('#next-button i');
  if (step === 1) {
    var knappText = "Välj liter"
  } else if (step === 2) {
    var knappText = "Markera ingredienser"
  } else if (step === 3) {
    var knappText = "Markera ingredienser"
  }
  $nextButtonText.textContent = knappText;
  $nextButton.classList.toggle('knapp-redo');
  $nextButtonIcon.classList.add('fa-caret-up');
  $nextButtonIcon.classList.remove('fa-caret-right');
};
const allowNextStep = () => {
  makeButtonGreen();
  checkmarkIcon();
  nextStepAllowed = true;
};
const makeButtonGreen = () => {
  const $nextButtonText = document.querySelector('#next-button div');
  const $nextButtonIcon = document.querySelector('#next-button i');
  if (step === 1) {
    var knappText = "Fortsätt"
  } else if (step === 2) {
    var knappText = "Fortsätt"
  } else if (step === 3) {
    var knappText = "Starta bryggning"
  }
  $nextButtonText.textContent = knappText;
  $nextButton.classList.toggle('knapp-redo');
  $nextButtonIcon.classList.remove('fa-caret-up');
  $nextButtonIcon.classList.add('fa-caret-right');
};
const checkmarkIcon = () => {
  if (step === 1) {
    var $stegIkon = document.querySelector('#step-1');
    var ikon = 'fa-beer';
  } else if (step === 2) {
    var $stegIkon = document.querySelector('#step-2');
    var ikon = 'fa-wine-bottle';
  } else if (step == 3) {
    var $stegIkon = document.querySelector('#step-3');
    var ikon = 'fa-list-ul';
  }
  $stegIkon.classList.remove(ikon);
  $stegIkon.classList.add('fa-check');
  $stegIkon.classList.add('klart-steg');
};

// Interaktioner - När recept väljs ur listan
const $receptLista = document.querySelector('#recept-dropdown');
$receptLista.addEventListener('change', function () {
  const valtRecept = $receptLista.options[$receptLista.selectedIndex].textContent;
  updateDisplayedSettings(valtRecept);
  allowNextStep();
});
const updateDisplayedSettings = (recipeFromList) => {
  if (recipeFromList === "Haga IPA") {
    bryggData.chosenRecipeObject = hagaIPA;
  } else if (recipeFromList === "Riddarbira") {
    bryggData.chosenRecipeObject === riddarbira;
  }
  document.querySelector('#s-name').value = bryggData.chosenRecipeObject.namn;
  const $receptRubrik = document.querySelector('#recept-rubrik');
  $receptRubrik.textContent = bryggData.chosenRecipeObject.namn;
  document.querySelector('#s-fermentables').value = bryggData.chosenRecipeObject.fermentables;
  document.querySelector('#s-mash-steps').value = bryggData.chosenRecipeObject.mashSteps;
  document.querySelector('#s-lautering').value = bryggData.chosenRecipeObject.lautering;
  document.querySelector('#s-boil-time').value = bryggData.chosenRecipeObject.boilTime;
  document.querySelector('#s-hops').value = bryggData.chosenRecipeObject.hops;
  document.querySelector('#s-yeast').value = bryggData.chosenRecipeObject.yeast;
  bryggData.maxLiters = bryggData.chosenRecipeObject.maxLiters;
};


// Interaktioner - När liter väljs
const $displayedLiters = document.querySelector('#bottled-liters-nr');
const $oneMoreLiterButton = document.querySelector('#mer');
const $oneLessLiterButton = document.querySelector('#mindre');
$oneMoreLiterButton.addEventListener('click', function () {
  if (bryggData.chosenLiters >= bryggData.maxLiters) {
  } else if (bryggData.chosenLiters === 0) {
    allowNextStep();
    bryggData.chosenLiters++;
  } else {
    bryggData.chosenLiters++;
  }
  $displayedLiters.textContent = bryggData.chosenLiters;
  document.querySelector('#s-chosen-liters').value = bryggData.chosenLiters;
  bryggData.maxLiters = bryggData.chosenLiters;
});
$oneLessLiterButton.addEventListener('click', function () {
  if (bryggData.chosenLiters === 0) {
    allowNextStep();
    bryggData.chosenLiters = bryggData.maxLiters;
  } else if (bryggData.chosenLiters === 1) {
    bryggData.chosenLiters = bryggData.maxLiters;
  } else {
    bryggData.chosenLiters--;
  }
  $displayedLiters.textContent = bryggData.chosenLiters;
  document.querySelector('#s-chosen-liters').value = bryggData.chosenLiters;
  bryggData.maxLiters = bryggData.chosenLiters;
});

// Interaktioner - När ingredienser klickas
const $ingrediensLista = document.querySelector('#ingredienser');
$ingrediensLista.addEventListener('click', function (element) {
  if (element.target === $ingrediensLista) {
  } else {
    element.target.classList.toggle('bought');
    const $boughtIngredients = document.querySelectorAll('.bought');
    if ($boughtIngredients.length === $ingrediensLista.children.length && nextStepAllowed === false) {
      allowNextStep();
    } else if ($boughtIngredients.length !== $ingrediensLista.children.length && nextStepAllowed === true) {
      makeButtonRed();
      nextStepAllowed = false;
    };
  }
});




// Interaktioner - Vid knappklick
const $nextButton = document.querySelector('#next-button'); $nextButton.addEventListener('click', function () {
  if (nextStepAllowed === true) {
    advanceToNextStep();
  } else {

    bounce();
  }
});


// Visa ingredienser från recept ------------------------------------------

const updateIngredients = () => {
  for (let index = 0; index < bryggData.chosenRecipeObject.fermentables.length; index++) {
    const fermentablesName = bryggData.chosenRecipeObject.fermentables[index][0];
    const fermentablesAmountInGrams = bryggData.chosenRecipeObject.fermentables[0][index + 1];
    fermentablesAmountInKg = fermentablesAmountInGrams / 1000 + " Kg";
    var li = document.createElement('li');
    var liText = document.createTextNode(fermentablesName + " - " + fermentablesAmountInKg);
    li.appendChild(liText);
    $ingrediensLista.appendChild(li);
  };
  for (let index = 0; index < bryggData.chosenRecipeObject.hops.length; index++) {
    const hopsName = bryggData.chosenRecipeObject.hops[index][0];
    const hopsAmount = bryggData.chosenRecipeObject.hops[index][1];
    var li = document.createElement('li');
    var liText = document.createTextNode(hopsName + " - " + hopsAmount + " g");
    li.appendChild(liText);
    $ingrediensLista.appendChild(li);
  };
  for (let index = 0; index < bryggData.chosenRecipeObject.yeast.length; index++) {
    const yeastName = bryggData.chosenRecipeObject.yeast[index][0];
    const yeastAmount = bryggData.chosenRecipeObject.yeast[index][1];
    var li = document.createElement('li');
    var liText = document.createTextNode(yeastName + " - " + yeastAmount + " g");
    li.appendChild(liText);
    $ingrediensLista.appendChild(li);
  };
}








// ---------------------------------------------------------------------------------







let brewingPhases = [
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
document.querySelector('#reset-button').addEventListener('click', resetProcess);
document.querySelector('#pios-icon').addEventListener('click', togglePIOs);
document.querySelector('#next-phase').addEventListener('click', setPhase);
document.querySelector('#last-phase').addEventListener('click', goToLastPhase);


// Starta app

setPhase();
$underBryggningSektion.style.display = "block";
$startSettingsSektion.style.display = "none";











// Get all the Meters
const meters = document.querySelectorAll('svg[data-value] .meter');

meters.forEach((path) => {
  // Get the length of the path
  let length = path.getTotalLength();
  // console.log(length) once and hardcode the stroke-dashoffset and stroke-dasharray in the SVG if possible 
  // or uncomment to set it dynamically
  // path.style.strokeDashoffset = length;
  // path.style.strokeDasharray = length;

  // Get the value of the meter
  let value = parseInt(path.parentNode.getAttribute('data-value'));
  // Calculate the percentage of the total length
  let to = length * ((100 - value) / 100);
  // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
  path.getBoundingClientRect();
  // Set the Offset
  path.style.strokeDashoffset = Math.max(0, to);
});










