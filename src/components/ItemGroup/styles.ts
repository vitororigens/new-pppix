import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
    color: theme.COLORS.white,
    size: theme.FONT_SIZE.lg
}))``;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.white};
    margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.xs}px;
    color: ${({ theme }) => theme.COLORS.white};
`;

export const ContentText = styled.View`
    margin-left: 10px;
`;

export const Button = styled(TouchableOpacity)``;