import styled from "styled-components/native";

export const Container = styled.View`
    max-height: 250px;
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.gray[200]};
`;