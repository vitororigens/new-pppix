import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: ${({ theme }) => theme.COLORS.white};
`;

export const Content = styled.View`
    flex: 1;
`;