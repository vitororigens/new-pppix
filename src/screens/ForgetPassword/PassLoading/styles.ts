import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const SubTitle = styled.Text`
 font-family: ${({ theme }) => theme.FONT_FAMILY.heading};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
    margin-bottom: 20px;
`;

export const Container = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems:'center',
        flexGrow: 1,
        paddingBottom: 20,
    },
}))`
    flex: 1;
    background: ${({ theme }) => theme.COLORS.white};
    padding: 20px;
`;


export const Text = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[600]};
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
`;