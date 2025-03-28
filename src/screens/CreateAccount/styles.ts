import styled from "styled-components/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from "react-native";

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
    width: 250px;
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
    flex: 1;
`;

export const ContentText = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const Icon = styled(FontAwesome).attrs(({ theme }) => ({
    color: theme.COLORS.gray[600],
    size: theme.FONT_SIZE.sm
}))`
    margin-right: 10px;
    margin-left: 20px;
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