import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: ${({ theme }) => theme.COLORS.white};
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.COLORS.gray[600]};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg}px;
    text-align: center;
    margin-top: 20px;
`;

export const ContentImage = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
