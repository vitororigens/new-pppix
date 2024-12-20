import { Container, Content, Icon, IconArrow, Items, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle?: string;
    onPress?: () => void;
}

export function FlatCard({icon, subTitle, title, onPress}: PortraitCardProps){
    return(
        <Container onPress={onPress}>
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