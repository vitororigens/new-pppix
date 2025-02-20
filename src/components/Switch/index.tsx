import React, { useState } from 'react';
import { Container, CustomSwitch, Title } from './styles';

type SwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
};

export function Switch({ onValueChange, value, disabled }: SwitchProps) {
  
  return (
    <Container>
      <CustomSwitch 
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
      />
    </Container>
  );
}
