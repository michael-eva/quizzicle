import { useState } from "react";

const Questions = ({ item, showCorrect, isSelected, onSelect }) => {
    const itemClick = (option) => {
        if (!showCorrect) {
            onSelect(option);
        }
    }

    return (
        <div className="questions-section">
            <div className="questions-container">
                <div className="question">{item.question}</div>
                <ul className="answer">
                    {item.options.map((option, index) => (
                        < li
                            key={index}
                            className={
                                (!showCorrect ? (isSelected === option ? 'selectedValue' : 'defaultAnswer')
                                    : isSelected === option ? (item.correctAnswer === option ? 'trueValue' : 'incorrectAnswer')
                                        : item.correctAnswer === option ? 'trueValue' : "remainingAnswers")
                            }
                            onClick={() => itemClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <hr />
            </div>
        </div >
    );
};

export default Questions;
