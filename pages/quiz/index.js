import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import LogoQuiz from '../../src/components/LogoQuiz';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Seu resultado:</h1>
      </Widget.Header>

      <Widget.Content>
        <img style={{ width: '100%'}} src='https://media1.tenor.com/images/7938622d12c1a104d1e649a9a5b82558/tenor.gif'></img>
        <h3>
          Você fez {' '}
          {results.reduce((somatorioAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatorioAtual +1;
            }
            return somatorioAtual;
          }, 0)} 
          {' '} ponto(s)!</h3>
  
          <a href='/'><Button type= 'submit' style={{ marginTop: '20px'}}>Jogar de Novo</Button></a>
          <a href='https://aluraquiz-base.alura-challenges.vercel.app/contribuidores' target='_blank'><Button type= 'submit' style={{ marginTop: '20px'}}>Divirta-se com mais Quizes!</Button></a>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <img style={{ width: '100%'}} src='https://media1.tenor.com/images/0bd53bc439762d0ac07975721780117d/tenor.gif'></img>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer; 
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  style={{ display: 'none'}}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <div style={{ textAlign:'center' }}>
             <p style={{marginTop:'20px', fontSize:'15px'}}>Isso aí, você acertou!</p>
             <span style={{display:'inline-block', borderRadius:'50%', overflow:'hidden', width:'100px', height:'100px'}}>
               <img style={{ width:'100%', height:'100%', objectFit:'cover' }} src='https://media.tenor.com/images/66321be3de75161c1141da9810fd0c61/tenor.gif'></img>
             </span>
          </div>
           }
          {isQuestionSubmited && !isCorrect && <div style={{ textAlign:'center' }}>
             <p style={{marginTop:'20px', fontSize:'15px'}}>Que pena, você errou!</p>
             <span style={{display:'inline-block', borderRadius:'50%', overflow:'hidden', width:'100px', height:'100px'}}>
               <img style={{ width:'100%', height:'100%', objectFit:'cover' }} src='https://media1.tenor.com/images/8dae0da4430ecd54d1097654ead8397a/tenor.gif'></img>
             </span>
          </div>
          }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
     setScreenState(screenStates.QUIZ);
    }, 1 * 3000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <LogoQuiz />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}