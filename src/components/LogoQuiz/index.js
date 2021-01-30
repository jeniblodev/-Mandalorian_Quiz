import styled from 'styled-components';

const QuizLogo = styled.div`
  display: block;
  margin: auto;
  img {
    width: 350px;
  }

  @media screen and (max-width: 500px) {
    img {
      width: 320px;
    }
  }

  @media screen and (max-width: 340px) {
    img {
      width: 250px;
    }
  }
  
`;

function LogoQuiz() {
  return (
    <QuizLogo>
        <img src='https://lumiere-a.akamaihd.net/v1/images/the-mandalorian-s2-logo-1200-notext_345f4acf.png' />
    </QuizLogo>
  );
}

export default LogoQuiz;