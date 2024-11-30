import styled from "styled-components/native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 8px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const Icon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.COLORS.gray[300],
    size: theme.FONT_SIZE.xl
}))`
    margin-right: 10px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
`;

export const ActionIcon = styled(MaterialIcons).attrs(({ theme }) => ({
    color: theme.COLORS.gray[300],
    size: theme.FONT_SIZE.xl
}))`
    margin-left: 10px;
`;

export const Button = styled(TouchableOpacity)``;
