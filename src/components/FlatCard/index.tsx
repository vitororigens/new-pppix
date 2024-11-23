import { Container, Content, Icon, IconArrow, Items, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle?: string;
}

export function FlatCard({icon, subTitle, title}: PortraitCardProps){
    return(
        <Container>
            <Icon name={icon}/>
            <Content>
            <Items>
            <Title>
                {title}
            </Title>
            <IconArrow name="arrow-forward-ios"/>
            </Items>
            <SubTitle>
                {subTitle}
            </SubTitle>
            </Content>
        </Container>
    )
}