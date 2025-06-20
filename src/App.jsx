import { useState, useEffect } from 'react'
import './App.css'
import { sugarIngredients, nonSugarIngredients, cardSetInfo } from './components/CardData'

function App() {
  const [count, setCount] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [isSugar, setIsSugar] = useState(true)

  const getRandomIngredient = () => {
    // Randomly decide whether to show sugar or non-sugar ingredient
    const showSugar = Math.random() < 0.5;
    const ingredients = showSugar ? sugarIngredients : nonSugarIngredients;
    const ingredientsList = Object.keys(ingredients);
    const randomIndex = Math.floor(Math.random() * ingredientsList.length);
    
    setCurrentIngredient(ingredientsList[randomIndex]);
    setIsSugar(showSugar);
  }

  useEffect(() => {
    getRandomIngredient();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  const handleAnswer = (answer) => {
    const isCorrectAnswer = (answer === isSugar);
    if (isCorrectAnswer) {
      setCount(count + 1);
    }
    setIsFlipped(true);
  }

  const handleNext = () => {
    setIsFlipped(false);
    getRandomIngredient();
  }
  
  return (
    <>
      <div className="header">
        <h1>{cardSetInfo.title}</h1>
        <p>{cardSetInfo.description}</p>
        <p>Total Cards: {cardSetInfo.totalCards}</p>
      </div>
      <div className="card-container">
        <h2>Correct: {count}</h2>
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3>{currentIngredient}</h3>
              <div className="button-container">
                <button onClick={() => handleAnswer(true)}>Yes, it's sugar</button>
                <button onClick={() => handleAnswer(false)}>No, it's not sugar</button>
                <button onClick={handleNext}>Skip</button>
              </div>
            </div>
            <div className="flip-card-back">
              <h3>{isSugar ? 'Yes, it is sugar!' : 'No, it is not sugar!'}</h3>
              <button onClick={handleNext}>Next Ingredient</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
