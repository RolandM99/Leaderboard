import './style.css';

const generateUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VKJp33RwkCKuvxrLsteg/scores/';

const playerTable = document.querySelector('#score-list > ul');
const refreshBtn = document.getElementById('reset-btn');
const submitBtn = document.getElementById('submit-btn');
const playerName = document.getElementById('name-player');
const playerScore = document.getElementById('score-player');

const AddScores = async (name, number) => {
  const request = await fetch(generateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score: number,
    }),
  });
  return request.json();
};

const getMyScores = async (link) => {
  const response = await fetch(link);
  return response.json();
};

const addScoreOnTable = (player, score) => {
  const listElement = document.createElement('li');
  listElement.innerHTML = `<a class="player-list"><i class="fas fa-user-circle"></i>&nbsp;&nbsp;&nbsp;${player} : ${score}</a>`;
  playerTable.appendChild(listElement);
};

const displayScreen = (string) => {
  if (string) {
    addScoreOnTable(playerName.value, playerScore.value);
    playerName.value = '';
    playerScore.value = '';
  }
};

const yetElementPost = () => {
  if (playerName.value !== '' && playerScore.value !== '') {
    AddScores(playerName.value, playerScore.value)
      .then((data) => displayScreen(data.result));
  }
};

const showScoresOnTable = () => {
  getMyScores(generateUrl)
    .then((data) => {
      playerTable.innerHTML = '';
      data.result.forEach((element) => addScoreOnTable(element.user, element.score));
    });
};

showScoresOnTable();
submitBtn.addEventListener('click', (el) => {
  el.preventDefault();
  yetElementPost();
});

refreshBtn.addEventListener('click', showScoresOnTable);