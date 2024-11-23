import { ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
    type: ButtonTypeProps;
}

export const Container = styled(TouchableOpacity)<Props>`
    min-height: 50px;
    max-height: 50px;
    width: 100%;
    border-radius: 30px;
    background: ${({theme}) => theme.COLORS.blue[600]};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.lg}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.heading};
    color: ${({theme}) =>  theme.COLORS.white };
`;

export const Loading = styled(ActivityIndicator).attrs(({theme}) => ({
    color: theme.COLORS.white
}) )``