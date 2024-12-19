import React from "react";
import { Container, Content, IconApp, Items, SubTitle, Title } from "./styles";
import { Switch } from "../Switch";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle?: string;
}

export function SecurityCard({icon, subTitle, title}: PortraitCardProps){
    return(
        <Container>
            <IconApp source={{uri: icon}} />
            <Content>
                <Items>
                    <Title>{title}</Title>
                </Items>
                {subTitle && <SubTitle>{subTitle}</SubTitle>}
            </Content>
            <Switch />
        </Container>
    );
}
