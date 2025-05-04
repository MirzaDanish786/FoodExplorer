import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ recipeData }) => {
    const [recipe_id, setRecipe_id] = useState(0); 
    const navigate = useNavigate();
    
    const handleClick = (recipe) => {
      setRecipe_id(recipe.r_id)
      navigate(`/Recipe`,{state: {recipe}})
    }
    
     
  return (
    <div>
      <div className=" grid grid-cols-3 gap-6  max-lg:grid-cols-2 max-md:grid-cols-1">
        {recipeData.map((recipe) => (
          <div
            key={recipe.r_id} onClick={()=>{handleClick(recipe)}} 
            className="card relative p-5 h-80 overflow-auto scrollbar-hide cursor-pointer  rounded-3xl"
            style={{
              backgroundImage: `url(${recipe.r_thumbnail})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-size 0.5s ease",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50 h-full"></div>

            <div className="relative">
              <div className=" r_name text-4xl font-bold">{recipe.r_name}</div>
              <div>
                <div className="font-medium text-2xl">Main Ingredients:</div>
                <ul>
                  {recipe.r_ingredients.slice(0, 6).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
