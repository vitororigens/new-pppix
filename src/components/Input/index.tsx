// Input.js
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Button, Container, Icon, IconInput, InputContainer, InputTypeProps } from "./styles";
import { useTheme } from "styled-components/native";

type InputProps = TextInputProps & {
    placeholder: string;
    onChangeText?: (text: string) => void;
    required?: boolean;
    passwordType?: boolean;
    showSearch?: boolean;
    showPlus?: boolean;
    onPress?: () => void;
    showIcon?: boolean;
    name?: string;
    value: string;
    type: InputTypeProps; 
}

export function Input({ placeholder, onChangeText, value, showSearch = false, passwordType = false, showIcon = false, name, type, showPlus = false, onPress }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const {COLORS, FONTE_SIZE} = useTheme()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container type={type}>
            {showIcon && (
               <IconInput name={name}/>
            )}
          
            <InputContainer
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={!showPassword && passwordType}
                value={value}
            />
            {passwordType && (
                <Button onPress={togglePasswordVisibility}>
                    <Icon name={showPassword ? 'eye' : 'eye-closed'} />
                </Button>
            )}
            {showSearch && (
                <Button onPress={onPress}>
                    <Icon color={COLORS.GRAY_400} size={FONTE_SIZE.GG} name="search" />
                </Button>
            )}
            {showPlus && (
                <Button onPress={onPress}>
                    <Icon color={COLORS.PINK_700} size={FONTE_SIZE.GG} name="plus-circle" />
                </Button>
            )}
        </Container>
    );
}
