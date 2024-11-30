import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: ${({ theme }) => theme.COLORS.white};
`;

export const Content = styled.View`
    flex: 1;
`;

export const TextError = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.sm}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    color: ${({theme}) => theme.COLORS.red[500]};
    text-align: center;
    align-self: flex-start;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 20px;
`;