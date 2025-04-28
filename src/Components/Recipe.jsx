import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Recipe = () => {
  const location = useLocation();
  const { recipeId } = location.state; 
  const navigate = useNavigate();

  const handleLogoClick = () =>{
    navigate('/')
  }

  const [recipeDetails, setRecipeDetails] = useState(null); 

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );
      const data = await response.json();
      setRecipeDetails(data.meals ? data.meals[0] : null); 
    };

    fetchRecipeDetails();
  }, [recipeId]); 

  if (!recipeDetails) return console.log("No recipe found!"); 

  let ingredients = [];
  let measures = [];
  for (let i = 1; i <= 20; i++) {
    let ingredient = recipeDetails[`strIngredient${i}`];
    let measure = recipeDetails[`strMeasure${i}`];
    if (ingredient !== "" && measure !== "") {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }
  console.log(ingredients);
  console.log(measures);

  return (
    <div>
       <div className='Logo flex text-4xl font-bold mb-6 cursor-pointer font-mono' onClick={handleLogoClick}>
        <div className='text-orange-500'>Food</div>
        <div className='text-white'>Explorer</div>
      </div>
      <div
        className="Container relative w-full min-h-[100vh] p-8 flex flex-col rounded-4xl max-sm:p-3"
        style={{
          backgroundImage: `url(${recipeDetails.strMealThumb})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70 h-full rounded-4xl"></div>

        
        <div className="TextContainer relative">
          <h1 className="text-5xl font-bold mb-3 max-sm:text-3xl">{recipeDetails.strMeal} <i> {`(${recipeDetails.strArea})`}</i></h1>
          <div className="flex gap-20 text-xl justify-center mb-10 max-md:text-lg">
            <div className="Ingredients">
              <div className="font-semibold text-2xl mb-2.5 max-sm:text-xl">Ingredients</div>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}> {ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="Measures">
              <div className="font-semibold text-2xl mb-2.5 max-md:text-xl">Measurments</div>
              <ul>
                {measures.map((measure, index) => (
                  <li key={index}> {measure}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold">Instructions:</div>
            <p className="text-lg font-semibold max-sm:font-medium">
              {recipeDetails.strInstructions}
            </p>
          </div>
        </div>
      </div>

      {/* You can add more recipe details as you wish */}
    </div>
  );
};

export default Recipe;
