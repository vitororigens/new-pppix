import { Container, Content, Icon, IconArrow, Items, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle?: string;
}

export function PersonCard({icon, subTitle, title}: PortraitCardProps){
    return(
        <Container>
            <Icon name={icon}/>
            <Content>
            <Items>
            <Title>
                {title}
            </Title>
            </Items>
            <SubTitle>
                {subTitle}
            </SubTitle>
            </Content>
        </Container>
    )
}