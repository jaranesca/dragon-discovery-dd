const monsterDropdown = document.getElementById("monsterDropdown");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

document.addEventListener("DOMContentLoaded", () => {
  loadMonsters();
});

searchButton.addEventListener("click", () => {
  const selectedMonster = monsterDropdown.value;
  if (selectedMonster) {
    searchMonster(selectedMonster);
  } else {
    monsterResult.innerHTML = "Please select a monster.";
  }
});

function loadMonsters() {
  axios
    .get(`https://www.dnd5eapi.co/api/monsters`)
    .then((response) => {
      const monsters = response.data.results;
      monsters.forEach((monster) => {
        const option = document.createElement("option");
        option.value = monster.index;
        option.textContent = monster.name;
        monsterDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      monsterResult.innerHTML = "Error loading monsters.";
    });
}

function searchMonster(monsterIndex) {
  monsterResult.innerHTML = "Searching...";

  axios
    .get(`https://www.dnd5eapi.co/api/monsters/${monsterIndex}`)
    .then((monsterResponse) => {
      const monsterData = monsterResponse.data;
      monsterResult.innerHTML = `
        <h1>${monsterData.name}</h1>
        <p><strong>Index:</strong> ${monsterData.index}</p>
        <p><strong>Size:</strong> ${monsterData.size}</p>
        <p><strong>Type:</strong> ${monsterData.type}</p>
        <p><strong>Alignment:</strong> ${monsterData.alignment}</p>
        <img src="https://www.dnd5eapi.co${monsterData.image}" alt="${monsterData.name}" class="monster-image" />
      `;
    })
    .catch((error) => {
      monsterResult.innerHTML = "Error fetching monster details.";
    });
}
