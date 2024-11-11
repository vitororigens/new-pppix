import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.200"
      h={"16"}
      px={4}
      fontSize="md"
      fontFamily="body"
      borderRadius={"xl"}
      color="gray.900"
      autoCapitalize="none"
      placeholderTextColor="gray.500"
      _focus={{
        bg: "gray.200",
        borderColor: "gray.400",
      }}
      {...rest}
    />
  );
}
