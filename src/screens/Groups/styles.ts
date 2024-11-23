import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        alignItems:'center',
        flexGrow: 1,
        paddingBottom: 20,
    },
}))`
    flex: 1;
    background: ${({ theme }) => theme.COLORS.white};
    padding: 20px;
`;


export const Content = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.blue[400]};
    min-height: 300px;
    border-radius: 8px;
    margin-top: 20px;
`;
