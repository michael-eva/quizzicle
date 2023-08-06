import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { nanoid } from 'nanoid';
import he from "he";

const Start = () => {
    //handle the clicks between pages
    const [isClicked, setIsClicked] = useState(false);
    //handle the data coming in from the api
    const [apiData, setApiData] = useState([]);
    //click button to highlight correct answers
    const [showCorrect, setShowCorrectValues] = useState(false);
    //handle the selected options
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [dataChange, setDataChange] = useState(false)


    const apiUrl = 'https://opentdb.com/api.php?amount=5';

    useEffect(() => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const combinedAnswers = data.results.map(item => ({
                    id: nanoid(),
                    question: he.decode(item.question),
                    options: [...item.incorrect_answers.map(he.decode), he.decode(item.correct_answer)].sort(),
                    correctAnswer: he.decode(item.correct_answer),
                }));
                setApiData(combinedAnswers);
                setSelectedOptions(Array(combinedAnswers.length).fill(null));
            })
            .catch(error => {
                console.error("Error fetching data", error);
            });
    }, [dataChange]);
    // handling button click on the start page
    const handleClick = () => {
        setIsClicked(true);
    }
    // handling button click on the questions page
    const setShowCorrect = () => {
        setShowCorrectValues(prevValue => !prevValue);
        if (showCorrect) {
            setDataChange(prevValue => !prevValue)
        }
    }

    const handleSelectedItem = (option, questionIndex) => {
        if (!showCorrect) {
            setSelectedOptions(prevState => {
                const newSelectedOptions = [...prevState];
                newSelectedOptions[questionIndex] = option;
                return newSelectedOptions;
            });
        }
    }
    const calculateScore = () => {
        let score = 0;
        apiData.forEach((item, index) => {
            if (selectedOptions[index] === item.correctAnswer) {
                score++;
            }
        });
        return score;
    }
    console.log(calculateScore());
    return (
        <div className="game-page">
            {!isClicked && (
                <div className="start-container">
                    <h2 className="title">Quizzical</h2>
                    <p className="description">Some description if needed</p>
                    <button onClick={handleClick} className="start-quiz-btn">Start Quiz</button>
                </div>
            )}
            {isClicked && (
                <div className="questions-page">
                    {apiData.map((item, index) => (
                        <Questions
                            key={item.id}
                            item={item}
                            showCorrect={showCorrect}
                            onSelect={(option) => handleSelectedItem(option, index)}
                            isSelected={selectedOptions[index]}
                        />
                    ))}
                    <div className="footer">
                        {showCorrect && (
                            <p className="score">Total Score {calculateScore()}/{apiData.length}</p>
                        )}
                        {!showCorrect ? (
                            <button onClick={setShowCorrect} className="button">Check answers</button>
                        ) : <button onClick={setShowCorrect} className="button">Play Again</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Start;
