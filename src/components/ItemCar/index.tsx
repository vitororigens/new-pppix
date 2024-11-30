import React from "react";
import { Container, Content, Icon, Title, ActionIcon, Button } from "./styles";

type ItemCarProps = {
  id: string;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  onDelete: () => void;
  onToggle: () => void;
  isChecked: boolean;
};

export function ItemCar({
  id,
  licensePlate,
  brand,
  model,
  color,
  onDelete,
  onToggle,
  isChecked,
}: ItemCarProps) {
  return (
    <Container>
      <Content>
        <Icon name="car" />
        <Title>
          {brand} - {licensePlate}
        </Title>
      </Content>
      <Button onPress={onToggle}>
        <ActionIcon
          name={isChecked ? "radio-button-checked" : "radio-button-unchecked"}
        />
      </Button>
      <Button onPress={onDelete}>
        <ActionIcon name="delete" />
      </Button>
    </Container>
  );
}
