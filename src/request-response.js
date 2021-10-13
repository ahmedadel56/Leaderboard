const gameId = 'joqz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;
const list = document.querySelector('.scores-list');
const refresh = document.querySelector('button[type = button]');
const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.getElementById('submit');

function pushData(data) {
  list.innerHTML = '';
  data.forEach((result) => {
    const { user, score } = result;
    const listItem = document.createElement('li');
    listItem.innerHTML = `${user}: ${score}`;
    list.appendChild(listItem);
  });
}

export const loadData = async () => {
  try {
    const res = await fetch(url);

    const data = await res.json();

    const { result } = data;

    pushData(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postScore = async () => {
  if (name.value && score.value) {
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          user: name.value,
          score: score.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      name.value = '';
      score.value = '';
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

submit.addEventListener('click', postScore);
refresh.addEventListener('click', loadData);

window.onload = () => {
  loadData();
};
