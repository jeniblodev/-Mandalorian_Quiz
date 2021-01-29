import styled from 'styled-components';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import LogoQuiz from '../src/components/LogoQuiz';




const LogoQuizb = styled.div`
  background-image: url('https://lumiere-a.akamaihd.net/v1/images/the-mandalorian-s2-logo-1200-notext_345f4acf.png');
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <LogoQuizb />
      <QuizContainer>
        <Widget>
          <Widget.Header>
              <h1>Mandalorian Quiz</h1>
            </Widget.Header>
          <Widget.Content>
            <p> Teste os seus conhecimentos sobre The Mandalorian!</p>
          </Widget.Content>
          
        </Widget>  
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React fez:</p>
          </Widget.Content>
        </Widget>    
        <Footer />
      </QuizContainer> 
      <GitHubCorner projectUrl="https://github.com/jeniblodev" />
    </QuizBackground>
  );
}
