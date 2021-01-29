import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <img src='https://lumiere-a.akamaihd.net/v1/images/the-mandalorian-s2-logo-1200-notext_345f4acf.png'/> 
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const LogoQuiz = styled.div`
    
`;

export default LogoQuiz;
