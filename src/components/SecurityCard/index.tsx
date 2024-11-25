import { Container, Content, Icon, Items, SubTitle, Title } from "./styles";
import Nu from "../../assets/nubank.svg";
import { Switch } from "../Switch";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle?: string;
}

export function SecurityCard({icon, subTitle, title}: PortraitCardProps){
    return(
        <Container>
            <Nu width={40} height={40} />
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
            <Switch/>
        </Container>
    )
}