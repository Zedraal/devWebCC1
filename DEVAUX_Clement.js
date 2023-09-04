"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  // Obtenir la valeur de l'élément max-usr
  const maxUserValue = parseInt($maxUsr.value);

  // Générer un nombre aléatoire entre 1 et maxUserValue
  secretNumber = Math.floor(Math.random() * maxUserValue) + 1;

  // Réinitialiser le message de sortie
  $output.textContent = "";

  // Réactiver le champ de saisie utilisateur et le bouton de devinette
  $numUsr.disabled = false;
  $guessBtn.disabled = false;

  // Focus sur le champ de saisie utilisateur
  $numUsr.focus();
}

$startBtn.addEventListener("click", launchGame);

function checkGuess() {
  const userGuess = parseInt($numUsr.value);

  if (userGuess === secretNumber) {
    $output.textContent = `Bravo! Vous avez deviné le nombre.`;
    // Désactiver le champ de saisie utilisateur et le bouton de devinette
    $numUsr.disabled = true;
    $guessBtn.disabled = true;
  } else if (userGuess < secretNumber) {
    $output.textContent = `Le nombre est plus grand.`;
  } else {
    $output.textContent = `Le nombre est plus petit.`;
  }

  // Effacer le champ de saisie utilisateur
  $numUsr.value = "";
}

$guessBtn.addEventListener("click", checkGuess);

$numUsr.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

function addCow(evt) {
  console.debug(evt.x, evt.y);
  const cowImage = document.createElement("img");
  cowImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg"; // Remplacez "chemin_de_votre_image.jpg" par le chemin de votre image
  cowImage.classList.add("cow");
  const imageWidth = 100; // Largeur de l'image (ajustez selon la taille de votre image)
  const imageHeight = 100; // Hauteur de l'image (ajustez selon la taille de votre image)
  const left = evt.x + window.scrollX - imageWidth / 2;
  const top = evt.y + window.scrollY - imageHeight / 2
  cowImage.style.position = "absolute"; // Position fixe pour suivre le curseur lors du défilement
  cowImage.style.left = `${left}px`;
  cowImage.style.top = `${top}px`;
  const randomRotation = Math.random() * 360; // Angle de rotation aléatoire entre 0 et 360 degrés
  cowImage.style.transform = `rotate(${randomRotation}deg)`;
  document.body.appendChild(cowImage);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}

$cowBtn.addEventListener("click", toggleCow);