import styled from 'styled-components';

export const Container = styled.div`
  .nav {
    display: flex;
    position: absolute;
    top: 0;
    right: 20px;
  }

  .nav ol {
    z-index: 5;
    display: flex;
    list-style: none;
    position: relative;
    margin: 0;
    padding: 0;
    width: 520px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
  }

  .nav li {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .nav a {
    color: black;
    display: flex;
    justify-content: center;
    font-size: 0.7rem;
    align-items: center;
    width: 130px;
    height: 20px;
    text-decoration: none;
    text-transform: uppercase;
  }

  .animation {
    width: 0px;
    height: 3px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--red);
    transition: all 0.4s;
  }

  /* Menu? */

  .menu {
    border-style: none;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    display: flex;
    visibility: hidden;
    justify-content: center;
    align-items: center;
  }

  .menu span {
    position: absolute;
    width: 30px;
    background-color: var(--orange);
    border-radius: 5px;
    height: 4px;
  }
  .menu input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }

  .menu span:nth-child(2) {
    transform: translateY(-12px);
    transition: all 0.2s;
  }
  .menu span:nth-child(5) {
    transform: translateY(12px);
    transition: all 0.2s;
  }
  .menu input:checked ~ span:nth-child(2) {
    opacity: 0;
  }
  .menu input:checked ~ span:nth-child(5) {
    opacity: 0;
  }
  .menu span:nth-child(3) {
    transform: rotate(0);
    transition: all 0.4s;
  }
  .menu span:nth-child(4) {
    transform: rotate(0);
    transition: all 0.4s;
  }
  .menu input:checked ~ span:nth-child(3) {
    transform: rotate(45deg);
  }
  .menu input:checked ~ span:nth-child(4) {
    transform: rotate(-45deg);
  }

  /* DESKTOP EXCLUSIVE */

  @media (min-width: 701px) {
    li:nth-child(1) ~ .animation {
      width: 130px;
    }

    li:nth-child(2):hover ~ .animation {
      width: 130px;
      left: 130px;
    }

    li:nth-child(3):hover ~ .animation {
      width: 130px;
      left: 260px;
    }

    li:nth-child(4):hover ~ .animation {
      width: 130px;
      left: 390px;
    }
  }

  /* MOBILE EXCLUSIVE */

  @media (max-width: 700px) {
    .nav ol {
      flex-direction: column;
      height: 100%;
      width: auto;
      margin-top: 20px;
    }
    .flex-center-row {
      display: flex;
      justify-content: center;
    }
    .menu {
      visibility: visible;
    }
    .hidden {
      visibility: hidden;
    }
    .nav a {
      height: 51px;
      margin-right: 10px;
      width: auto;
    }
  }
`;
