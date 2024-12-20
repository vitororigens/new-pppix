import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.white};
    padding: 20px;
    align-items: center;
    justify-content: center;
`;