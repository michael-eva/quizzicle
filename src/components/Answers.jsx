import { useState } from "react"
import Start from "./Start"

const Answers = () => {
    const [isClicked, setIsClicked] = useState(false)
    const handleClick = () => {
        setIsClicked(true)
    }

    return (
        <div className="game-play">
            {!isClicked && (
                <div className="questions-container">
                    <div className="question">Questions</div>
                    <ul className="answer">
                        <li>Answers</li>
                        <li>Another answer</li>
                    </ul>
                    <hr />
                    <p>You scored xxx correct answers</p>
                    <button onClick={handleClick} className="button">Play Again</button>
                </div>
            )}
            {isClicked && (
                <Start />
            )}
        </div>
    )
}

export default Answers