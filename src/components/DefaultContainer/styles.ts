import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";

export type DividerTypeProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
    type: DividerTypeProps;
}


export const Container = styled(SafeAreaView)`
    flex: 1;
    background: ${({theme}) => theme.COLORS.white};
`;

export const Menu = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.lg}px;
    color: ${({theme}) => theme.COLORS.gray[300]};
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    
`;

export const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.lg}px;
    color: ${({theme}) => theme.COLORS.purple[600]};
    font-family: ${({theme}) => theme.FONT_FAMILY.body};
    
`;

export const Button = styled(TouchableOpacity)`
margin-right: 10px;
`;

export const Icon = styled(FontAwesome).attrs(({theme}) => ({
    color: theme.COLORS.gray[300],
    size: theme.FONT_SIZE.lg
}))``;

export const ContainerMenu = styled.View`
  min-width: 90px;
  border-radius: 5px;
  background-color: #fff;
  max-height: 200px;
  top: -20px;
  right: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
