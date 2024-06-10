document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.querySelector("#monster-container");
    const createMonsterDiv = document.querySelector("#create-monster");
    const loadMoreButton = document.querySelector("#load-more-monsters");
  
    let currentPage = 1;
    const limit = 50;
  
    // Function to fetch and display monsters
    function fetchMonsters(page, limit) {
      fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => {
            const monsterItem = document.createElement("div");
            monsterItem.innerHTML = `
              <h3>${monster.name}</h3>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterItem);
          });
        })
        .catch(error => console.error('Error fetching monsters:', error));
    }
  
    // Function to create a new monster
    function createMonsterForm() {
      const form = document.createElement("form");
      form.id = "create-monster-form";
  
      const nameInput = document.createElement("input");
      nameInput.id = "name";
      nameInput.type = "text";
      nameInput.name = "name";
      nameInput.placeholder = "Name";
  
      const ageInput = document.createElement("input");
      ageInput.id = "age";
      ageInput.type = "number";
      ageInput.name = "age";
      ageInput.placeholder = "Age";
  
      const descInput = document.createElement("input");
      descInput.id = "description";
      descInput.type = "text";
      descInput.name = "description";
      descInput.placeholder = "Description";
  
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Create Monster";
  
      form.appendChild(nameInput);
      form.appendChild(ageInput);
      form.appendChild(descInput);
      form.appendChild(submitButton);
  
      form.addEventListener("submit", function(e) {
        e.preventDefault();
  
        const name = e.target.name.value;
        const age = e.target.age.value;
        const description = e.target.description.value;
  
        fetch("http://localhost:3000/monsters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            age: age,
            description: description
          })
        })
        .then(response => response.json())
        .then(newMonster => {
          const monsterItem = document.createElement("div");
          monsterItem.innerHTML = `
            <h3>${newMonster.name}</h3>
            <p>Age: ${newMonster.age}</p>
            <p>Description: ${newMonster.description}</p>
          `;
          monsterContainer.appendChild(monsterItem);
          form.reset();
        })
        .catch(error => console.error('Error creating monster:', error));
      });
  
      createMonsterDiv.appendChild(form);
    }
  
    // Event listener for the Load More Monsters button
    loadMoreButton.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage, limit);
    });
  
    // Initialize the page with the first 50 monsters and create monster form
    fetchMonsters(currentPage, limit);
    createMonsterForm();
  });
  