import { useState, useEffect } from 'react'
import './App.css'
import Searchbar from './Components/Searchbar'
import Ingredients from './Components/Ingredients'
import Card from './Components/Card'
import { Route, Routes } from 'react-router-dom'
import Recipe from './Components/Recipe'
import Swal from 'sweetalert2'
import Loading from './Components/Loading'

function App() {
  const [query, setQuery] = useState("")
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const API_KEY = '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'
  const prompt = `Please generate a JSON array of at least 6 recipes for "${query}", where each recipe follows this format:
  [
    {
      "name": "Recipe Name",
      "ingredients": ["ingredient1", "ingredient2", "..."],
      "measurements": ["measure1", "measure2", "..."],
      "instructions": "Step by step instructions in at least 4 lines.",
      "area": "e.g. Chinese, Indian, etc"
    }
  ]`;
  
  
  const AI_Recipe = async(prompt) =>{
    try{
      setIsLoading(true)
      let response = await fetch(`https://openrouter.ai/api/v1/chat/completions`,{
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model:"openai/gpt-3.5-turbo", 
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
        })
      })
      let data = await response.json();
      console.log(data)
      const content = data.choices[0].message.content;

      let parsed;
      try{
        parsed = JSON.parse(content)
        console.log("Parsed:", parsed)

      }
      catch(error){
        console.log("AI Response is not parased!", error)
        return
      }
      setIsLoading(false)

      let AI_Recipe_Array = [];
      if(parsed){
        setRecipeData([])
        parsed.forEach((recipe, index)=>{
          AI_Recipe_Array.push({
            r_id: Date.now()+index,
            r_name: recipe.name,
            r_ingredients: recipe.ingredients,
            r_measurements: recipe.measurements,
            r_instructions: recipe.instructions,
            r_area:recipe.area,
            r_thumbnail: "https://media.istockphoto.com/id/1998660059/photo/ai-artificial-intelligence-security-sentinel-password-cyber-security-ransomware-email.jpg?s=1024x1024&w=is&k=20&c=c2OXv-HBy9LxISuqw1CRv5e6oHNIOmAJ00iaDjOPCmE="
          })
        })
      }
      // console.log("AI Recipe", AI_Recipe_Array)
      setRecipeData(AI_Recipe_Array)
      console.log(recipeData)
    }
    catch(error){
        console.error("AI error:", error);
        setIsLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'AI Error',
          text: 'Something went wrong while generating the recipe. Try again later.',
        });
      
      console.log(error)
    }
  }

  

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
        let measurementsArray = [];
        for(let i = 1; i<=20; i++){
          if(meal[`strMeasure${i}`] !== ""){
            let measures = meal[`strMeasure${i}`];
            measurementsArray.push(measures);
          }
        }
        
        recipeDataArray.push({
          r_id:meal.idMeal,
          r_name: meal.strMeal,
          r_ingredients: ingredientsArray,
          r_measurements: measurementsArray,
          r_instructions: meal.strInstructions,
          r_area: meal.strArea,
          r_thumbnail:meal.strMealThumb
        }
        )

      });
      setRecipeData(recipeDataArray)
      // console.log(recipeData)
    }
    else if(data.meals === null){
      AI_Recipe(prompt)
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
      {isLoading && <Loading/>}
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
