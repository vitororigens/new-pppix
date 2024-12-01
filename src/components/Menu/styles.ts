import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';
import { Platform, TouchableOpacity } from "react-native";

const topContainer = Platform.OS === "ios" ? "10px" : "-15px";

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.md}px;
  color: ${({ theme }) => theme.COLORS.gray[300]};
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: row;
  height: 30px;
  margin-bottom: 5px;
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
  color: theme.COLORS.gray[300],
  size: 24,
}))`
  margin-right: 10px;
`;

export const Container = styled.View`
  min-width: 100px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.COLORS.white};
  max-height: 200px;
  top: ${topContainer};
  right: 20px;
  padding: 10px;
  shadow-color: ${({theme}) => theme.COLORS.gray[950]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
