import styled from "styled-components/native";
import {Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 40px;
`;


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.white};
    border-radius: 10px;
    padding: 20px;
`;

export const Span = styled.Text`
  color: ${({theme}) => theme.COLORS.gray[300]};
  font-size: ${({theme}) => theme.FONT_SIZE.sm}px;
`;

export const IconAlert = styled(Feather).attrs(({theme}) => ({
  color: theme.COLORS.yellow[500],
  size: theme.FONT_SIZE.md
}))``;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ItemsLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const ItemsRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const ButtonClose = styled(TouchableOpacity)``;

export const IconClose = styled(FontAwesome).attrs(({theme}) => ({
  color: theme.COLORS.gray[300],
  size: theme.FONT_SIZE.md
}))``;

export const Boddy = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.COLORS.gray[600]};
  font-size: ${({theme}) => theme.FONT_SIZE.md}px;
`;

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.COLORS.gray[600]};
  font-size: ${({theme}) => theme.FONT_SIZE.md}px;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.COLORS.gray[300]};
  font-size: ${({theme}) => theme.FONT_SIZE.md}px;
`;

export const Content = styled.View`
  width: 100%;
  gap: 5px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;