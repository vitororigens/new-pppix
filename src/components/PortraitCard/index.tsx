import { Container, Icon, SubTitle, Title } from "./styles";

type PortraitCardProps = {
    icon: string;
    title: string;
    subTitle01?: string;
    subTitle02?: string;
}

export function PortraitCard({icon, subTitle01, subTitle02, title}: PortraitCardProps){
    return(
        <Container>
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