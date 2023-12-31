const SearchBtn = document.getElementById('search-btn');
const MealList = document.getElementById('meal');
const MealDetailsContent = document.getElementById('meal-details-content');
const RecipeCloseBtn = document.getElementById('recipe-close-btn');

SearchBtn.addEventListener('click', GetMealList);

MealList.addEventListener('click', GetMealRecipe);

RecipeCloseBtn.addEventListener('click', () => {
    MealDetailsContent.parentElement.classList.remove('showRecipe');
});

function GetMealList() {
    let SearchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchInput}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="">
                            </div>
                            <div class="meal-name">
                                <h3 class="item-title">${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn" id="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                MealList.classList.remove('not-found');
            } else {
                html = "Sorry, we didn't find any meal!";
                MealList.classList.add('not-found');
            }
            MealList.innerHTML = html;
        });
}

// Get recipe of the meal
function GetMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let MealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => MealRecipeModal(data.meals));
    }
}

// Create a modal
function MealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="...">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    MealDetailsContent.innerHTML = html;
    MealDetailsContent.parentElement.classList.add('showRecipe');
}