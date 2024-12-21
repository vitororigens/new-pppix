import { Container, Content, IconAlert, Span, Title, Button, TitleButton } from "./styles";

type ItemNotificationProps = {
    name: string;
    date: string;
    status: number;
    onPress: () => void;

}

export function ItemNotification({ name, date, status, onPress }: ItemNotificationProps) {
    return (
        <Container>
            <Content>
                <Title><IconAlert name="alert-triangle" /> {name} enviou um alerta</Title>

            </Content>
            <Content>
                <Span>{date}</Span>
                {status === 0 ? (
                    <Button>
                        <TitleButton onPress={onPress}>Encerrar SOS</TitleButton>
                    </Button>
                ) : (
                    <Span>Alerta encerrado</Span>
                )}
            </Content>
        </Container>
    )
}