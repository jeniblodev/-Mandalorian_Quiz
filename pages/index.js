import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import LogoQuiz from '../src/components/LogoQuiz';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <LogoQuiz />
        <Widget>
          <Widget.Header>
              <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input 
                onChange={function(infosDoEvento) {
                  setName(infosDoEvento.target.value);
                }}
                placeholder='Diz aí seu nome para jogar =)'
              />
              <Button type='submit' disabled={name.length === 0}>
                Bora para o jogo {name}!
              </Button>
            </form>
            
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
