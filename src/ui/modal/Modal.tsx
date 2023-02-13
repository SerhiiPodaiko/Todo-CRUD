import {FC, useEffect, useMemo, ReactNode} from "react"
import {createPortal} from "react-dom"
import styled from "styled-components"
import Btn from "../button/Button"

const modalRootElement = document.querySelector("#modal-portal") as HTMLDivElement

interface ModalProps {
    children: ReactNode,
    open: boolean,
    onClose: () => void,
    title: string
}

const Modal: FC<ModalProps> = ({children, open, onClose, title}) => {
    const element = useMemo(() => document.createElement("div"), [])

    useEffect(() => {
        if (open) {
            modalRootElement.appendChild(element)
            document.body.style.overflow = "hidden"

            return () => {
                modalRootElement.removeChild(element)
                document.body.style.overflow = ""
            }
        }
    }, [open])

    const StyledModal = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center; 
    `

    const StyledModalBody = styled.div`
        max-width: 500px;
        width: 100%;
        background: #fff;
        border-radius: 20px;

        @media (max-width: 568px) {
            margin: 0 15px;
        }
    `

    const StyledModalHeader = styled.header`
        padding: 15px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #9457eb;
    `

    const StyledHeading = styled.h2`
        font-size: 20px;
        color: 9457EB;   
    `

    const StyledWrapperSvg = styled.div`
         width: 25px;
         height: 25px;
         cursor: pointer;
    `

    const StyledMain = styled.main`
        padding: 0 15px 0;
    `

    const StyledFooter = styled.footer`
         margin-top: 15px;
         padding: 15px;
         display: flex;
         align-items: center;
         gap: 10px;
         border-top: 1px solid #9457eb;
    `

    if (open) {
        return createPortal(
            <StyledModal onClick={onClose}>
                <StyledModalBody onClick={e => e.stopPropagation()}>
                    <StyledModalHeader>
                        <StyledHeading>{title}</StyledHeading>
                        <StyledWrapperSvg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={onClose}>
                                <path fill="#6563ff" d="m13.414 12 3.293-3.293a1 1 0 0 0-1.414-1.414L12 10.586 8.707 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414Z"/>
                                <path fill="#b2b1ff" d="M19.07 4.93A10 10 0 1 0 4.93 19.07 10 10 0 1 0 19.07 4.93Zm-2.363 10.363a1 1 0 1 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12Z"/></svg>
                        </StyledWrapperSvg>
                    </StyledModalHeader>
                    <StyledMain>
                        {children}
                    </StyledMain>
                    <StyledFooter>
                        <Btn onClick={onClose} color={false}>
                            Close
                        </Btn>
                    </StyledFooter>
                </StyledModalBody>
            </StyledModal>,
            modalRootElement)
    }

    return null
}

export default Modal
