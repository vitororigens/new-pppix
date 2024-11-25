import { Switch } from "react-native";
import styled from "styled-components/native";
import theme from "../../theme";

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CustomSwitch = styled(Switch).attrs(({ theme }) => ({
    trackColor: { false: theme.COLORS.gray[300], true: theme.COLORS.blue[600] }, 
    thumbColor: theme.COLORS.white,
  }))``;

