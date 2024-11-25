import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: ${({ theme }) => theme.COLORS.white};
`;



export const Content = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 20,
    },
}))`
    flex: 1;
    margin-top: 20px;
`;