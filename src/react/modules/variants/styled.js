import styled, { css } from 'styled-components';

export const Selected = css`
    border: solid 1px #333;
`;

export const Radio = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding: 10px 15px;
    border: solid 1px rgba(0,0,0,.01);
    cursor: pointer;
    ${ (props) => props.selected && Selected }
`;