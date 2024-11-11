import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={16}
      rounded="xl"
      fontSize="md"
      bg={type === "SECONDARY" ? "red.500" : "blue.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.400" : "blue.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        textTransform={"uppercase"}
        fontWeight="bold"
        color={type === "SECONDARY" ? "white" : "white"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
