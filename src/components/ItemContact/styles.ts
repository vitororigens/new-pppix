import styled from "styled-components/native";
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 10px;
`;

export const Content = styled.View`
    width: 100%;
    flex: 1;
    margin-left: 10px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray[600]};
    margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
`;

export const StyledIcon = styled.View`
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: ${({theme}) => theme.COLORS.gray[300]};
    align-items: center;
    justify-content: center;
   
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.white};
    text-align: center;
`;

export const SendIcon = styled(Feather).attrs(({ theme }) => ({
    color: theme.COLORS.gray[600],
    size: theme.FONT_SIZE.md
}))``;

export const Button = styled(TouchableOpacity)``