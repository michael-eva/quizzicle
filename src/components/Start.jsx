import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Start = () => {
    const [categories, setCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [selectedType, setSelectedType] = useState('')
    let navigate = useNavigate()

    localStorage.setItem("Search Params", null)
    const handleClick = () => {
        const queryString = [];
        if (selectedCategory) {
            queryString.push(`category=${selectedCategory}`);
        }
        if (selectedDifficulty) {
            queryString.push(`difficulty=${selectedDifficulty}`);
        }
        if (selectedType) {
            queryString.push(`type=${selectedType}`);
        }

        const finalQueryString = queryString.length > 0 ? `${queryString.join("&")}` : "";

        console.log("Final Query String:", finalQueryString);
        localStorage.setItem("Search Params", finalQueryString)
        navigate('/gameplay')
    }

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            setCategories(data.trivia_categories)
        }
        getCategories()
    }, [])

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value)
    }
    function handleDifficultyChange(e) {
        setSelectedDifficulty(e.target.value)
    }
    function handleTypeChange(e) {
        setSelectedType(e.target.value)
    }

    return (
        <div className="game-page">
            <div className="start-container">
                <h2 className="title">Quizzical</h2>
                <p className="description">Choose your settings:</p>
                <div className="game-options">
                    <label htmlFor="category">Category:</label>
                    <select name="category" onChange={handleCategoryChange}>
                        <option value=''>-Select Category-</option>
                        <option value="">All Categories</option>
                        {categories && categories.map((category, index) =>
                            <option value={category.id} key={index}>
                                {category.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="game-options">
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select name="difficulty" onChange={handleDifficultyChange}>
                        <option value=''>-Select Difficulty-</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="game-options">

                    <label htmlFor="type">Select Type:</label>
                    <select name="type" onChange={handleTypeChange}>
                        <option value=''>-Select Type-</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True or False</option>
                    </select>
                </div>
                <button onClick={handleClick} className="start-quiz-btn">Start Quiz</button>
            </div>
        </div>
    );
}

export default Start;
