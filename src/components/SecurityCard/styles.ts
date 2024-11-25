import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {AntDesign }from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
    border-radius: 8px;
    background-color: ${({theme}) => theme.COLORS.blue[400]};
    align-items: center;
    flex-direction: row;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
`;

export const Icon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.COLORS.white,
    size: 50
}))`
    margin-right: 10px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.medium};
    font-size: ${({theme}) => theme.FONT_SIZE.md}px;
    color: ${({theme}) => theme.COLORS.white};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    font-size: ${({theme}) => theme.FONT_SIZE.sm}px;
    color: ${({theme}) => theme.COLORS.white};
`;

export const Content = styled.View`
    width: 100%;
    flex: 1;
    margin-left: 10px;
`;

export const Items = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;