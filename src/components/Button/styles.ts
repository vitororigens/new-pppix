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
    background: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.PURPLE_600  : theme.COLORS.PINK_700};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) =>  theme.COLORS.WHITE };
`;

export const Loading = styled(ActivityIndicator).attrs(({theme}) => ({
    color: theme.COLORS.WHITE
}) )``