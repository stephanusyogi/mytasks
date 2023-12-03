"use client"
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import styled from 'styled-components'

interface Props{
  content: React.ReactNode
}

function Modal({content}:Props) {
  const {closeModal, theme} = useGlobalState()
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        {content}
      </div>
    </ModalStyled>
  )
}

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 100;
  align-items: center;

  .modal-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.45);
    filter: blur(4px);
  }

  .modal-content{
    /* margin: 2rem; */
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    overflow-y: auto;

    border-radius: 1rem;
    background-color: ${(props)=>props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0,0,0,0.3);
    border-radius: ${(props)=>props.theme.borderRadiusMd2};
  }
`

export default Modal