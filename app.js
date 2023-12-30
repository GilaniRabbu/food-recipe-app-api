const SearchBtn = document.getElementById('search-btn');
const MealList = document.getElementById('meal');
const MealDetailsContent = document.getElementById('meal-details-content');
const RecipeCloseBtn = document.getElementById('recipe-close-btn');

SearchBtn.addEventListener('click', GetMealList);

// Need update ...
MealList.addEventListener('click', GetMealRecipe);

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