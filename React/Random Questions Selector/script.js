'use strict';

document.addEventListener('DOMContentLoaded', init);

function init(){

  const startMessage = 'Get ready, questions will appear here';

  const questionsSection = document.getElementById('random-questions-space');
  const chosenQuestionsSpace = document.getElementById('chosen-questions-space');
  const errorMessageBar = document.getElementById('message');

  //random questions number in range of 5 to 10
  const questionsNumber = Math.floor(Math.random() * 6) + 5; 
  const apiUrl = 'https://spentdb.com/api.php?amount=' + questionsNumber;

  fetch(apiUrl).
    then(response => response.json()).
    then(gameSetup).
    catch((error)=>{
      const errorMessage = 'Unable to load, see ' + error.message;
      displayErrorMessage(errorMessage);
    });

  function gameSetup(json){
    questionsSection.innerText = startMessage;
    setTimeout(function f(){
      questionsSection.innerText = '';
    }, 1000);
    setTimeout(function f(){
      fillQuestionsBox(json);
    }, 1000);
  }

  function fillQuestionsBox(json){
    const results = json.results;
    results.map(result=>{
      const option = document.createElement('section');
      option.innerHTML = result.question;
      option.value = result;
      option.className = 'question';
      questionsSection.appendChild(option);
    });
    questionsSection.addEventListener('click', saveSelectedQuestion);
    const questionsLifetime = setInterval(()=>removeQuestion(questionsLifetime), 1000);
  }

  function saveSelectedQuestion(element){
    if(chosenQuestionsSpace.childNodes.length > 3){
      displayErrorMessage('You can only have 3 questions');
    } else if(element.id !== 'random-questions-space'){
      var question = element.srcElement; 
      questionsSection.removeChild(question);
      chosenQuestionsSpace.appendChild(question);
    }
  }

  function removeQuestion(lifetimeInterval){
    if(questionsSection.childElementCount !== 0){
      questionsSection.childNodes[0].remove();
    }else{
      clearInterval(lifetimeInterval);
    }
  }

  function displayErrorMessage(errorMessage){
    errorMessageBar.innerText = errorMessage;
  }
}

//eslint steps
//https://eslint.org/docs/latest/use/getting-started
