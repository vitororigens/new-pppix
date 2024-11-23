import styled from "styled-components/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export const Container = styled.View`
    background-color: ${({theme}) => theme.COLORS.blue[600]};
    padding: 10px;
    width: 100%;
    border-radius: 8px;
`;

export const Icon = styled(FontAwesome5).attrs(({ theme }) => ({
    color: theme.COLORS.white,
    size: theme.FONT_SIZE.lg
}))`
    margin-right: 10px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.medium};
    font-size: ${({theme}) => theme.FONT_SIZE.lg}px;
    color: ${({theme}) => theme.COLORS.white};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    font-size: ${({theme}) => theme.FONT_SIZE.xs}px;
    color: ${({theme}) => theme.COLORS.white};
`;


export const ContentTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ContentText = styled.View`
    align-items: center;
    padding: 10px;
`;