// recipe-app.js
// ===============================
// Recipe Builder with Food Library Picker
// ===============================

// LocalStorage
let recipeLibrary = JSON.parse(localStorage.getItem("recipeLibrary")) || [];
function saveRecipeLibrary() {
    localStorage.setItem("recipeLibrary", JSON.stringify(recipeLibrary));
}

// Load Food Library from Daily Nutrition Tracker
let foodLibrary = JSON.parse(localStorage.getItem("foodLibrary")) || [];

// Add ingredient row
function addIngredientRow() {
    const container = document.getElementById("recipe-ingredients");

    const row = document.createElement("div");
    row.className = "ingredient-row";

    row.innerHTML = `
        <input type="text" placeholder="Ingredient name" class="recipe-input ingredient-name" />
        <input type="text" placeholder="Unit" class="recipe-input ingredient-unit" />
        <input type="number" placeholder="Amount" class="recipe-input ingredient-amount" />
        <button class="pick-food-button">Pick</button>
        <div class="ingredient-nutrition"></div>
    `;

    // Add event listener for the Pick button
    row.querySelector(".pick-food-button").addEventListener("click", () => {
        openFoodPicker(row);
    });

    container.appendChild(row);
}

// Open Food Picker Popup
function openFoodPicker(targetRow) {
    const popup = document.getElementById("food-picker-popup");
    const list = document.getElementById("food-picker-list");

    list.innerHTML = "";

    foodLibrary.forEach(food => {
        const li = document.createElement("li");
        li.textContent = `${food.name} — ${food.calories} cal`;

        li.addEventListener("click", () => {
            targetRow.querySelector(".ingredient-name").value = food.name;
            targetRow.querySelector(".ingredient-unit").value = ""; // unit already embedded in name
            targetRow.querySelector(".ingredient-amount").value = 1;

            // Store food data on the row
            targetRow.dataset.food = JSON.stringify(food);

            // Show nutrition info
            const info = `${food.calories} cal, ${food.fat}g fat, ${food.carbs}g carbs`;
            targetRow.querySelector(".ingredient-nutrition").textContent = info;

            popup.classList.remove("visible");
        });

        list.appendChild(li);
    });

    popup.classList.add("visible");
}

// Close popup
document.getElementById("food-picker-close").addEventListener("click", () => {
    document.getElementById("food-picker-popup").classList.remove("visible");
});

// Save recipe
function saveRecipe() {
    const name = document.getElementById("recipe-name").value.trim();
    const yieldVal = document.getElementById("recipe-yield").value.trim();
    const prep = document.getElementById("recipe-prep").value.trim();
    const directions = document.getElementById("recipe-directions").value.trim();

    if (!name) {
        alert("Recipe must have a name.");
        return;
    }

    const ingredients = [...document.querySelectorAll(".ingredient-row")].map(row => {
        const food = row.dataset.food ? JSON.parse(row.dataset.food) : null;
        return {
            name: row.querySelector(".ingredient-name").value.trim(),
            unit: row.querySelector(".ingredient-unit").value.trim(),
            amount: row.querySelector(".ingredient-amount").value.trim(),
            calories: food ? food.calories : null,
            fat: food ? food.fat : null,
            carbs: food ? food.carbs : null
        };
    });

    const recipe = {
        name,
        yield: yieldVal,
        prep,
        ingredients,
        directions
    };

    recipeLibrary.push(recipe);
    saveRecipeLibrary();
    renderRecipeList();

    alert("Recipe saved.");
}

// Render saved recipes
function renderRecipeList() {
    const list = document.getElementById("recipe-list");
    list.innerHTML = "";

    recipeLibrary.forEach((recipe, index) => {
        const li = document.createElement("li");
        li.textContent = recipe.name;

        li.addEventListener("click", () => {
            alert(`Load recipe: ${recipe.name}`);
        });

        list.appendChild(li);
    });
}

// Event Listeners
document.getElementById("recipe-add-ingredient").addEventListener("click", addIngredientRow);
document.getElementById("recipe-save").addEventListener("click", saveRecipe);

// Initial load
addIngredientRow();
renderRecipeList();







