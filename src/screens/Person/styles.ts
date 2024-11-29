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
    padding: 20px;
`;


export const Content = styled.View`
    background-color: ${({ theme }) => theme.COLORS.white};
    border-radius: 8px;
    padding: 20px;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray[600]};
    margin-bottom: 20px;
    text-align: center;
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
    margin-bottom: 10px;
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