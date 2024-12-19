import React from "react";
import { Button, Container, Content, ContentHeader, Icon, Title } from "./styles";
import { Popover } from "react-native-popper";
import { Menu } from "../Menu";

type GroupCardProps = {
    title: string;
    children: React.ReactNode;
    onEdit?: () => void;
}

export function GroupCard({children, title, onEdit}: GroupCardProps) {
    return (
        <Container>
            <ContentHeader>
                <Title>
                    {title}
                </Title>
                <Popover
              trigger={
                <Button>
                   <Icon name="menu" />
                </Button>
              }
            >
              <Popover.Backdrop />
              <Popover.Content>
                <Menu onEdit={onEdit} />
              </Popover.Content>
            </Popover>
               
            </ContentHeader>
            <Content>
                {children}
            </Content>
        </Container>
    )
}