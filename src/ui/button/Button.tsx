import {ReactNode, FC} from "react"
import styled from "styled-components"

interface BtnProps {
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    color: boolean
}

const StyledButton = styled.button`
    padding: 10px 15px;
    color: #fff;
    border-radius: 8px;
    border: none;
    outline: none;  
    transition: .3s ease-in;
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`

const Btn: FC<BtnProps> = ({children, onClick, disabled, color}) => {
    return (
        <StyledButton
            disabled={disabled}
            onClick={onClick}
            style={{background: color ? "#9457EB" : "#EB4C42"}}>
            {children}
        </StyledButton>
    )
}

export default Btn
