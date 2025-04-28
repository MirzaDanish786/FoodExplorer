import { useState, useEffect } from 'react'
import './App.css'
import Searchbar from './Components/Searchbar'
import Ingredients from './Components/Ingredients'
import Card from './Components/Card'
import { Route, Routes } from 'react-router-dom'
import Recipe from './Components/Recipe'
import Swal from 'sweetalert2'

function App() {
  const [count, setCount] = useState(0)
  const [query, setQuery] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [recipeData, setRecipeData] = useState([]);
  const fetchRecipe =async () =>{
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let data = await response.json();
    let recipeDataArray = [];
    if(data.meals){
      data.meals.forEach(meal => {
        let ingredientsArray = [];
        for(let i = 1; i<=20 ; i++){
          if(meal[`strIngredient${i}`] !== ""){
            let ingredient = meal[`strIngredient${i}`]
            ingredientsArray.push(ingredient);
          }
        }
        
        recipeDataArray.push({
          r_id:meal.idMeal,
          r_name: meal.strMeal,
          r_ingredients: ingredientsArray,
          r_instructions: meal.strInstructions,
          r_area: meal.strArea,
          r_thumbnail:meal.strMealThumb
        }
        )
        // setIngredients(meal.strInstructions)

      });
      setRecipeData(recipeDataArray)
      console.log(recipeData)
    }
    else{
      setRecipeData([]);
      setQuery("")
      Swal.fire({
        title: 'Recipe Not Found!',
        text: 'We could not find any recipe matching your search.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  useEffect(() => {
    fetchRecipe()
  },[query])
  
  const handleSearchQuery = (newQuery) => {
    setQuery(newQuery);
  }
  console.log(query);
  
  return (
  
    <div className="Container w-full h-full p-8 flex flex-col text-white max-sm:p-3">
      <Routes>
        <Route path='/' element = {<> 
                                <Searchbar onSearch = {handleSearchQuery}/>
                                <Card recipeData = {recipeData}/>
        </>}/>
        <Route path='/Recipe' element = {<Recipe/>}/>
    
      </Routes>

    </div>
    
  )
}

export default App
