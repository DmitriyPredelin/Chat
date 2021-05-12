import { ReactNode } from 'react';
import styled from 'styled-components'


type badgeProps = {
    backGround: string;
    position: string;
    hidden : boolean;
    value?: string;
}


const Span = styled.span`
    width: 20px;
    height: 20px;
    background-color: ${(props: badgeProps) => props.backGround};
    line-height : 1.2;
    border-radius : 50%;
    display : flex;
    padding : 0px;
    margin : 0px;
    color : white;
    border : 1px solid white;
    position : absolute;

 ${props => props.hidden === true && `
    visibility : hidden;
`}
${props => props.position === "rightTop" && `
    transform: translateX(200%) translateY(-100%);   
`}
${props => props.position === "rightBot" && `
    transform: translateX(200%) translateY(100%) ;
`}
`;



export const Badge: React.FC<badgeProps> = (props) => {
    const value: string | undefined = props.value;
    if (props.value) {
        if (parseInt(props.value) === 0) {
            return <></>
        }
    }
    return <Span {...props}>
        <div style={{ margin: "auto" }}>{props.value}</div></Span>
}
