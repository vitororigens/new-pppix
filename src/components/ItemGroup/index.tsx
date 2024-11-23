import { Container, Content, ContentText, Icon, SubTitle, Title } from "./styles";

type ItemGroupProps = {
    phone: string;
    subTitle: string;
}


export function ItemGroup({phone, subTitle}: ItemGroupProps){
    return(
        <Container>
            <Content>
                <Icon name="user"/>
                <ContentText>
                    <Title>
                        {phone}
                    </Title>
                    <SubTitle>
                         {subTitle}
                    </SubTitle>
                </ContentText>
            </Content>
            <Icon name="dots-three-vertical"/>
        </Container>
    )
}