import React from "react";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

type InputProps = "PRIMARY" | "SECONDARY";

type PickerSelectProps = {
    items: Item[];
    selectedValue?: string | null;
    onValueChange?: (value: any, index: number) => void; // Altere o tipo aqui
    placeholder?: Item;
    type?: InputProps;
};

export function PickerSelect({
    items,
    selectedValue,
    onValueChange,
    placeholder = { label: "Selecione uma opção", value: "" },
    type
}: PickerSelectProps) {
    const { COLORS } = useTheme();

    return (
        <RNPickerSelect
            onValueChange={(value, index) => onValueChange?.(value, index)} 
            items={items}
            value={selectedValue}
            placeholder={placeholder}
            useNativeAndroidPickerStyle={false}
            style={{
                inputIOS: {
                    maxHeight: 50,
                    minHeight: 50,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    color: COLORS.blue[400],
                    paddingRight: 30,
                    backgroundColor: COLORS.white,
                    borderRadius: type === 'PRIMARY' ? 8 : 0,
                    marginBottom: 5
                },
                inputAndroid: {
                    maxHeight: 50,
                    minHeight: 50,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: type === 'PRIMARY' ? 8 : 0,
                    color: COLORS.blue[400],
                    paddingRight: 30,
                    backgroundColor: COLORS.white,
                    marginBottom: 5
                },
                iconContainer: {
                    top: 15,
                    right: 10,
                },
            }}
            Icon={() => <Ionicons name="chevron-down" size={24} color={COLORS.gray[300]} />}
        />
    );
}
