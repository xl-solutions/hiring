import React from 'react'
import { FooterContainer } from './styles'
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <img src="perfil.jpg" alt="" />
        <strong>Gustavo de Campos Antunes</strong>
        <p>
          Front-end developer e Poeta de terra batida
          <br /> de Sarapuí interior de São Paulo, em busca da simplidade!
        </p>
      </div>
      <div>
        <a href="https://github.com/gusdecante" target="_blank">
          <AiFillGithub />
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/gustavo-de-campos-antunes-347853163/"
          target="_blank"
        >
          <AiFillLinkedin />
          Linkedin
        </a>
        <a href="https://gustavodecamposantunes.medium.com/" target="_blank">
          <AiFillMediumCircle />
          Medium
        </a>
      </div>
    </FooterContainer>
  )
}

export default Footer
