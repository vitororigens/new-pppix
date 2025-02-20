import { ScrollView, TextInput } from "react-native";
import styled from "styled-components/native";

type InputVariant = 'PRIMARY' | 'SECONDARY'; 

interface InputProps {
  variant?: InputVariant;
}

export const SubTitle = styled.Text`
 font-family: ${({ theme }) => theme.FONT_FAMILY.heading};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[300]};
    margin-bottom: 20px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px
`;

export const Container = styled(ScrollView).attrs(() => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        justifyContent: 'center',
        flexGrow: 1,
        paddingBottom: 20,
    },
}))`
    flex: 1;
    background: ${({ theme }) => theme.COLORS.white};
    padding: 20px;
`;


export const Text = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.body};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray[600]};
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
`;

export const ContentItems = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const Input = styled(TextInput)<InputProps>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme, variant }) =>
    variant === 'SECONDARY' ? theme.COLORS.gray[300] : theme.COLORS.red[500]};
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
  color: ${({ theme }) => theme.COLORS.gray[300]};
`;