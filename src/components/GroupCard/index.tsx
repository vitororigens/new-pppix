import React from "react";
import { Container, Content, ContentHeader, Icon, Title } from "./styles";

type GroupCardProps = {
    title: string;
    children: React.ReactNode;
}

export function GroupCard({children, title}: GroupCardProps) {
    return (
        <Container>
            <ContentHeader>
                <Title>
                    {title}
                </Title>
                <Icon name="menu" />
            </ContentHeader>
            <Content>
                {children}
            </Content>
        </Container>
    )
}