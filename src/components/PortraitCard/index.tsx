import { Container, Icon, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle01?: string;
    subTitle02?: string;
    onPress?: () => void;
}

export function PortraitCard({icon, subTitle01, subTitle02, title, onPress}: PortraitCardProps){
    return(
        <Container onPress={onPress}>
            <Icon name={icon}/>
            <Title>
                {title}
            </Title>
            <SubTitle>
                0 {subTitle01}
            </SubTitle>
            <SubTitle>
                0 {subTitle02}
            </SubTitle>
        </Container>
    )
}