import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.COLORS.blue[600]};
    padding: 20px;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.heading};
    font-size: ${({theme}) => theme.FONT_SIZE.lg};
    color: ${({theme}) => theme.COLORS.white};

`;
