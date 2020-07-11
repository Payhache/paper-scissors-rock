const launchGame = function () {
  let result;
  let playerScore = 0;
  let computerScore = 0;
  // Definit le nombre de parties à gagner
  let gameLimit = 3;
  // Selection de l'image a changer pour afficher choix comp
  const computerChoiceImage = document.getElementById("imgComputerChoice");
  // Selection des choix possibles par #id
  const choices = document.querySelectorAll(".choice");
  // Selection des scores :
  const playerScoreSPan = document.getElementById("user-score");
  const computerScoreSpan = document.getElementById("computer-score");
  // Selection du texte pour annoncer le résultat :
  let resultSentence = document.querySelector(".result");
  //Fonction lancée pour obtenir le choix de l'ordinateur
  const randomComputerChoice = function (randomChoice) {
    return choices[randomChoice].id;
  };
  /*Choix effectué par le joueur, une boucle est faite sur le
tableau afin de récuperer le click  sur chaque élément */
  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function () {
      let playerChoice;
      let computerChoice;
      /* Fais en sorte d'obtenir un chiffre entre 1 et 3 aléatoirement 
    pour ensuite l'associer à l'index du tableau choices */
      let randomChoice = Math.round(Math.random() * 2);
      // Affectation du choix du joueur
      playerChoice = choices[i].id;
      // Affectation du choix de l'ordinateur
      computerChoice = randomComputerChoice(randomChoice);
      // lancement du jeu
      // reset jeu avec le bouton
      // selection du bouton reset :
      const btnReset = document.querySelector(".btn-reset");
      btnReset.addEventListener("click", resetGame);
      // Gestion de l'affichage de l'image computer :
      // Choix computer = rock
      if(computerChoice === "r"){
        computerChoiceImage.setAttribute("src", "img/pierre.png");
      }
      // Choix computer = paper
      if(computerChoice === "p"){
        computerChoiceImage.setAttribute("src", "img/feuille.png");
      }
      // Choix computer = cissors
      if(computerChoice === "c"){
        computerChoiceImage.setAttribute("src", "img/ciseau.png");
      }

      // Lancement de la fonction game pour Affichage du résultat
      game(playerChoice, computerChoice);
      
      // Pas de vainqueur
      if (result === "tie") {
        resultSentence.textContent = "Egalité recommence !";
        // Ajoute couleur grise autour du choix en cas de bonne réponse
        document.getElementById(playerChoice).classList.add("grey-glow");
        // Efface la couleur grise aprés quelques secondes
        setTimeout(function () {
          document.getElementById(playerChoice).classList.remove("grey-glow");
        }, 1000);
        // Fin pas de vainqueur
        // Joueur Gagne
      } else if (result === "win") {
        // Incrématation du score joueur en cas de victoire
        playerScore++;
        // Affichage du score du joueur
        playerScoreSPan.textContent = playerScore;
        resultSentence.textContent = ` Tu marques un point !  ${convertToWord(
          playerChoice
        )} bat ${convertToWord(computerChoice)}! `;
        // Ajoute couleur verte autour du choix en cas de bonne réponse
        document.getElementById(playerChoice).classList.add("green-glow");
        // Efface la couleur verte aprés quelques secondes
        setTimeout(function () {
          document.getElementById(playerChoice).classList.remove("green-glow");
        }, 1000);
        // Fin joueur Gagne
        // Joueur perd
      } else if (result === "loose") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        resultSentence.textContent = `Tu as perdu ! ${convertToWord(
          computerChoice
        )} bat ${convertToWord(playerChoice)} !`;
        // Ajoute couleur rouge autour du choix en cas de bonne réponse
        document.getElementById(playerChoice).classList.add("red-glow");
        // Efface la couleur rouge aprés quelques secondes
        setTimeout(function () {
          document.getElementById(playerChoice).classList.remove("red-glow");
        }, 1000);
        // Fin joueur perd
      }
      // reset du jeu avec le score:
      if (computerScore == gameLimit || playerScore == gameLimit) {
        if (computerScore > playerScore) {
          resultSentence.textContent = "Tu as perdu  la partie";
        } else {
          resultSentence.textContent = "Tu as gagné la partie";
        }
        // attend 2 seconde avant de reset le game pour permettre l'affichage du score
        setTimeout(resetGame, 2000);
      }
     

    });
  }
  // Comparaison des résultats :
  function game(playerChoice, computerChoice) {
    switch (playerChoice + computerChoice) {
      case "rr":
      case "pp":
      case "cc":
        result = "tie";
        break;
      case "rc":
      case "cp":
      case "pr":
        result = "win";
        break;
      default:
        result = "loose";
        break;
    }
  }

  // Fonction pour afficher le resultat en toute lettre
  function convertToWord(letter) {
    if (letter === "r") return " la Pierre";
    if (letter === "p") return " le Papier";
    if (letter === "c") return "les Ciseaux";
  }
  // Fonction pour reset le jeu
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    computerScoreSpan.textContent = computerScore;
    playerScoreSPan.textContent = playerScore;
  }
};

launchGame();
