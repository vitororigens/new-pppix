import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        justifyContent: 'center',
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
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const ContentPortraitCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
`;