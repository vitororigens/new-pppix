import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AntDesign from '@expo/vector-icons/AntDesign';

export const Container = styled(TouchableOpacity)`
    height: 130px;
    border-radius: 20px;
    background-color: ${({theme}) => theme.COLORS.blue[400]};
    align-items: center;
    justify-content: center;
    padding: 10px;
    flex: 1;
`;

export const Icon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.COLORS.white,
    size: theme.FONT_SIZE.xl
}))``;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.medium};
    font-size: ${({theme}) => theme.FONT_SIZE.md};
    color: ${({theme}) => theme.COLORS.white};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    font-size: ${({theme}) => theme.FONT_SIZE.sm};
    color: ${({theme}) => theme.COLORS.white};
`;