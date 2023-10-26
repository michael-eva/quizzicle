import Questions from "./Questions";
import { nanoid } from 'nanoid';
import he from "he";
import { useEffect, useState } from "react";


export default function Gameplay() {
    const [showCorrect, setShowCorrectValues] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [dataChange, setDataChange] = useState(false)
    const [searchParams, setSearchParams] = useState(localStorage.getItem('Search Params') || '');


    useEffect(() => {
        const response = localStorage.getItem('Search Params')
        setSearchParams(response)
    }, [])

    useEffect(() => {

        const apiUrl = `https://opentdb.com/api.php?amount=5&${searchParams}`;

        console.log(apiUrl);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
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
    }, [searchParams, dataChange]);

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
    return (
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
    )
}
