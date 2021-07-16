
import styled from 'styled-components';

const Button = styled.button`

border: none;
  border-radius: 2px;
  padding: 12px 18px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: black;
  box-shadow: 0 0 4px #999;
  outline: none;
   background-position: center;
  transition: background 0.8s;

  
${props => {
        if (props.disabled === true) {
            return `
                background-color:#d9534f;
        `
        }
    }}
    ${props => {
        if (props.variant === 'google') {
            return `
        background-color:#5bc0de;
        color:white;
        `
        }
    }}

  &:hover{
       background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
  }
  
  &:active{
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
  }
  `

export default Button