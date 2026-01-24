// ===============================
// Recipe Builder Logic
// ===============================

// LocalStorage
let recipeLibrary = JSON.parse(localStorage.getItem("recipeLibrary")) || [];
function saveRecipeLibrary() {
    localStorage.setItem("recipeLibrary", JSON.stringify(recipeLibrary));
}

// Add ingredient row
function addIngredientRow() {
    const container = document.getElementById("recipe-ingredients");

    const row = document.createElement("div");
    row.className = "ingredient-row";

    row.innerHTML = `
        <input type="text" placeholder="Ingredient name" class="recipe-input ingredient-name" />
        <input type="text" placeholder="Unit" class="recipe-input ingredient-unit" />
        <input type="number" placeholder="Amount" class="recipe-input ingredient-amount" />
    `;

    container.appendChild(row);
}

// Auto-expand directions textarea
function autoExpandDirections() {
    const el = document.getElementById("recipe-directions");
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
}

// Save recipe
function saveRecipe() {
    const name = document.getElementById("recipe-name").value.trim();
    const yieldVal = document.getElementById("recipe-yield").value.trim();
    const yieldUnit = document.getElementById("recipe-yield-unit").value.trim();
    const prep = document.getElementById("recipe-prep").value.trim();
    const prepUnit = document.getElementById("recipe-prep-unit").value.trim();
    const directions = document.getElementById("recipe-directions").value.trim();

    if (!name) {
        alert("Recipe must have a name.");
        return;
    }

    const ingredients = [...document.querySelectorAll(".ingredient-row")].map(row => ({
        name: row.querySelector(".ingredient-name").value.trim(),
        unit: row.querySelector(".ingredient-unit").value.trim(),
        amount: row.querySelector(".ingredient-amount").value.trim()
    }));

    const recipe = {
        name,
        yield: yieldVal,
        yieldUnit,
        prep,
        prepUnit,
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
document.getElementById("recipe-directions").addEventListener("input", autoExpandDirections);

// Initial load
addIngredientRow();
renderRecipeList();


