import { Button, Container, Icon, Title } from './styles';

type ItemMenuProps = {
    onEdit: () => void;
    onDelete: () => void;
}

export function Menu({onDelete, onEdit}: ItemMenuProps) {
    return (
        <Container>
            <Button onPress={onEdit}>
                <Icon name="pencil" />
                <Title>Editar</Title>
            </Button>
            <Button onPress={onDelete}>
                <Icon name="trash" />
                <Title>Excluir</Title>
            </Button>
        </Container>
    );
}
