import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.COLORS.blue[600]};
    padding: 20px;

`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.heading};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.white};

`;

export const SubTitle = styled.Text`
 font-family: ${({ theme }) => theme.FONT_FAMILY.heading};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
    margin-bottom: 20px;
`;

export const Content = styled(ScrollView).attrs(() => ({
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


export const Text = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[600]};
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const TextColor = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.purple[600]};
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const ContentItems = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const ContentText = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
