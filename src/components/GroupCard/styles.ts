import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from "react-native";

export const Container = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false
}))`
   width: 100%;
    background-color: ${({ theme }) => theme.COLORS.blue[400]};
    max-height: 300px;
    border-radius: 8px;
    margin-top: 20px;
`;


export const ContentHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.white};
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
    color: theme.COLORS.white,
    size: theme.FONT_SIZE.lg
}))``;

export const Content = styled.View`
    flex: 1;
    padding: 10px;
`;

export const Button = styled(TouchableOpacity)``;
