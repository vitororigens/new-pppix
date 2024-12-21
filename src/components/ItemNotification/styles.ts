import styled from "styled-components/native";
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    height: 100px;
    flex: 1;
    padding: 10px;
    background-color: ${({ theme }) => theme.COLORS.gray[100]};
    border-radius: 8px;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.gray[600]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
`;

export const IconAlert = styled(Feather).attrs(({ theme }) => ({
    color: theme.COLORS.yellow[500],
    size: theme.FONT_SIZE.md
}))``;

export const Content = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Span = styled.Text`
  color: ${({ theme }) => theme.COLORS.gray[300]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
`;

export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.COLORS.red[500]};
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  color: ${({ theme }) => theme.COLORS.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm}px;
`;
