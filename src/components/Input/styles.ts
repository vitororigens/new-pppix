import { TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Octicons, FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    max-height: 50px;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.COLORS.blue[600]};
`;


export const InputContainer = styled(TextInput).attrs(({ theme }) => ({
    placeholderTextColor: theme.COLORS.gray[300]
}))`
    flex: 1;

    min-height: 60px;
    max-height: 60px;

    color: ${({ theme }) => theme.COLORS.gray[300]};
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
    padding: 15px;
`;

export const Button = styled(TouchableOpacity)``;


export const Icon = styled(Octicons).attrs(({ theme }) => ({
    color: theme.COLORS.gray[300],
    size: theme.FONT_SIZE.md
}))``;


export const IconInput = styled(FontAwesome5).attrs(({ theme }) => ({
    color: theme.COLORS.gray[300],
    size: theme.FONT_SIZE.md
}))``;