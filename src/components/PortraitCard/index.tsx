import { Container, Icon, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    number01?: number;
    number02?: number;
    subTitle01?: string;
    subTitle02?: string;
    onPress?: () => void;
}

export function PortraitCard({icon, subTitle01, subTitle02, title, onPress, number01, number02}: PortraitCardProps){
    return(
        <Container onPress={onPress}>
            <Icon name={icon}/>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {number01} {subTitle01}
            </SubTitle>
            <SubTitle>
                {number02} {subTitle02}
            </SubTitle>
        </Container>
    )
}