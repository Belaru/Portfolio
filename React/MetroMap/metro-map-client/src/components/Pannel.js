import { useEffect, useState } from 'react';

/**
 * Represents informational pannel for clients
 * @param {*} props - function to be used by Quiz component
 * @returns 
 */
export function Pannel(props) {
  const [isQuizMode, setQuizMode] = useState(false);
  const [isInfoMode, setInfoMode] = useState(false);

  let quiz;
  if(isQuizMode){
    quiz = <Quiz isOpen={isQuizMode} showMap={props.showMap}/>;
  }
  
  return (
    <div className="pannel">
      <div id="pannel-mode-controls">
        <section>
          <input type="radio" id="info-mode" name="mode" value="info-mode" 
            onChange={() => {
              setQuizMode(false);
              setInfoMode(true);
            }}/>
          <label htmlFor="info-mode">Info Mode</label>
        </section>
        <section>
          <input type="radio" id="question-mode" name="mode" value="question-mode" 
            onChange={() => {
              setQuizMode(true);
              setInfoMode(false);
            }}/>
          <label htmlFor="question-mode">Question Mode</label>
        </section>
      </div>
      { quiz }
      <p id="info-msg" hidden={!isInfoMode}>
        Welcome to stm map! Take a fun, metro stations coordinations quiz by choosing Question Mode.
      </p>
      <p id="error-msg"></p>
    </div>
  );
}

/**
 * Fetches 5 random stations' coordinates questions
 * @param {*} initializeQuestions - function where the values are passed
 */
async function getQuestions(){
  const fetchedQuestions = await fetch('/random-questions/5');
  if(fetchedQuestions.ok){
    const allQuestions = await fetchedQuestions.json();
    return allQuestions;
  }else{
    const messageSpace = document.getElementById('error-msg');
    messageSpace.innerText = 'Oops! Couldn\'t load the Quiz.';
  }
}

/**
 * Represents quiz mode pannel
 * @param {*} props - function updating Map points
 */
export function Quiz(props) {
  const [score, setScore] = useState(0);
  const [scoreMessage, setMessage] = useState('');
  const [answer, setAnswer] = useState('');

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    initQuestions(1, 5);
  }, []);
  
  async function initQuestions(start, end){
    try{
      const fetchedQuestions = await getQuestions();
      const firstQuestion = fetchedQuestions[0];
      setQuestion(firstQuestion);
      setAnswer(firstQuestion.correct_answer);
      if(firstQuestion.coordinates){
        props.showMap([firstQuestion.coordinates[1], firstQuestion.coordinates[0]]);
      }
      setQuestions(fetchedQuestions.splice(start, end));
    } catch(error){
      const errorDisplay = document.getElementById('error-msg');
      errorDisplay.innerText = 'No questions available';
    };
  }

  const [count, setCount] = useState(0);
  /** Function displays the next question */
  function changeQuestion(){
    setSubmitStatut(false);
    setCount(count + 1);
    if(count < questions.length){
      const currentQuestion = questions[count];
      setQuestion(currentQuestion);
      setAnswer(currentQuestion.correct_answer);
      if(currentQuestion.coordinates){
        props.showMap([currentQuestion.coordinates[1], currentQuestion.coordinates[0]]);
      }
      var ele = document.getElementsByName('Question');
      for(var i = 0; i < ele.length; i++){
        ele[i].checked = '';
      }
    }else{
      setCount(0);
      initQuestions(0, 5);
    }
  }
  
  const [submitStatus, setSubmitStatut] = useState(false);

  /** Loads question if questions are defined and quiz mode is on */
  if(questions.length > 0 && props.isOpen){
    return (
      <section className="quiz">
        <div id="question-display">
          <Question question={question}/>
          <button className="quiz-btn" type="button" disabled={submitStatus}
            onClick={() => {
              const radioIsChecked = checkInputIsGiven();
              if(radioIsChecked){
                setSubmitStatut(true);
                updateScoreStatus(answer, score, setScore, setMessage);
              }
            }}>
            Submit
          </button>
          <button className="quiz-btn" type="button" disabled={!submitStatus}
            onClick={() => {
              changeQuestion();
              setMessage('');
            }}>
            Next Question
          </button>
        </div>
        <Score scoreStatus={scoreMessage} score={score} />
      </section> 
    );
  }
}

/**
 * Checks if at least one radio input is checked
 * @returns bool 
 */
function checkInputIsGiven(){
  const options = document.getElementsByName('Question');
  let checked = false;
  for(var i = 0; i < options.length; i++){
    if(options[i].checked){
      checked = true;
    }
  }
  if(!checked){
    const messageDisplay = document.getElementById('question-score');
    messageDisplay.innerHTML = 'You must give an answer!';
  }
  return checked;
}

/**
 * Represents a question form
 * @param {*} props - question 
 * @returns 
 */
export function Question(props) {
  const question = props.question;
  
  if(question && question.options){
    return (
      <div id="coordinates-question">
        <h2>
          Which station is at?
        </h2>
        <div>
          <input type="radio" id={question.options[0]} name="Question" value={question.options[0]}/>
          <label htmlFor={question.options[0]}>{question.options[0]}</label>
        </div>
        <div>
          <input type="radio" id={question.options[1]} name="Question" value={question.options[1]}/>
          <label htmlFor={question.options[1]}>{question.options[1]}</label>
        </div>
        <div>
          <input type="radio" id={question.options[2]} name="Question" value={question.options[2]}/>
          <label htmlFor={question.options[2]}>{question.options[2]}</label>
        </div>
      </div>
    );
  }
}

/**
 * Displays appropriate message and score to the user when they submit their answer
 * @param {*} answer - correct answer
 * @param {*} score - client's score
 * @param {*} updateScore - function to change client's score
 * @param {*} updateMessage - function displaying answer message
 */
function updateScoreStatus(answer, score, updateScore, updateMessage){
  const questionAnswer = document.getElementsByName('Question');
  let value;
  for (const opt of questionAnswer) {
    if (opt.type === 'radio') {
      if (opt.checked){
        value = opt.value;
        break;
      }
    }
  }
  if(value === answer){
    updateScore(score + 1);
    updateMessage('That\'s right!');
  }else{
    updateMessage(`Sorry, the correct answer is ${answer}`);
  }
}

/**
 * Represents space where user score and submit messages are displayed
 * @param {*} props - score and display message
 * @returns 
 */
export function Score(props) {
  const scoreNumberMessage = 'Your score is ' + props.score;
  return (
    <section id="score-diplay">
      <p id="question-score">
        {props.scoreStatus}
      </p>
      <p id="score">
        {scoreNumberMessage}
      </p>
    </section>
  );
}

/**
 * element visibility
 * https://stackoverflow.com/questions/9456289/
 * how-to-make-a-div-visible-and-invisible-with-javascript
 * 
 * clear radio buttons
 * https://stackoverflow.com/questions/2554116/how-to-clear-radio-button-in-javascript
 * 
 * conditional rendering 
 * https://legacy.reactjs.org/docs/conditional-rendering.html
 */