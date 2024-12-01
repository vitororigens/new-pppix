import { Menu } from "../Menu";
import { Button, Container, Content, ContentText, Icon, SubTitle, Title } from "./styles";
import { Popover } from "react-native-popper";

type ItemGroupProps = {
    phone: string;
    subTitle: string;
    id: string;
    onDelete: () => void;
    onEdit: () => void;
}


export function ItemGroup({ phone, subTitle, onDelete, onEdit }: ItemGroupProps) {
    return (
        <Container>
            <Content>
                <Icon name="user" />
                <ContentText>
                    <Title>
                        {phone}
                    </Title>
                    <SubTitle>
                        {subTitle}
                    </SubTitle>
                </ContentText>
            </Content>
           
            <Popover
              trigger={
                <Button>
                  <Icon name="dots-three-vertical" />
                </Button>
              }
            >
              <Popover.Backdrop />
              <Popover.Content>
                <Menu onDelete={onDelete} onEdit={onEdit} />
              </Popover.Content>
            </Popover>
        </Container>
    )
}