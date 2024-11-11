import {
  Text,
  HStack,
  Box,
  Heading,
  Flex,
  SearchIcon,
  Button,
  VStack,
} from "native-base";
import { CaretLeft, Export } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { ButtonIcon } from "./ButtonIcon";
import { Input } from "./Input";

interface Props {
  title?: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  description?: string;
  showSearchButton?: boolean;
  isNewGroupButtonVisible?: boolean;
  showNewGroupButton?: boolean;
  type?: "primary" | "secondary";
  onShare?: () => void;
  onCreateGroup?: () => void;
  label?: string;
  selectedMode?: string;
}

export function Header({
  title,
  showBackButton = false,
  showShareButton = false,
  showSearchButton = false,
  showNewGroupButton = false,
  isNewGroupButtonVisible = false,
  description,
  type = "primary",
  onShare,
  onCreateGroup,
  label = '',
  selectedMode = ''
}: Props) {
  const navigation = useNavigation();

  const EmptyBoxSpace = () => <Box w={6} h={6} />;

  if (type === "secondary") {
    return (
      <VStack pb={5} pt={"14"} w="full" justifyContent="flex-end">
        <HStack w={"full"} alignItems="center" justifyContent={"space-between"}>
          <VStack>
            <Text fontFamily="heading" fontSize={"3xl"}>
              {title}
            </Text>

            {description && (
              <Text fontSize={"sm"} color={"gray.400"}>
                {description}
              </Text>
            )}
          </VStack>
          {selectedMode == 'valid'  && (
            <Button
              size="sm"
              variant="solid"
              colorScheme="blue"
              onPress={onCreateGroup}
            >
              {
                (isNewGroupButtonVisible) ? 'Finalizar' : label
              }
            </Button>
          )}
        </HStack>
      </VStack>
    );
  }

  return (
    <HStack
      w="full"
      h={16}
      alignItems="flex-end"
      pb={4}
      px={5}
      bg={"light.200"}
      shadow={2}
    >
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {showBackButton ? (
          <Box borderColor={"gray.200"} borderWidth={1} rounded="md">
            <ButtonIcon icon={CaretLeft} onPress={() => navigation.goBack()} />
          </Box>
        ) : (
          <EmptyBoxSpace />
        )}

        <Text
          color="gray.800"
          fontSize="lg"
          fontWeight={"bold"}
          fontFamily="heading"
          textAlign="center"
        >
          {title}
        </Text>

        {showShareButton ? (
          <ButtonIcon icon={Export} onPress={onShare} />
        ) : (
          <EmptyBoxSpace />
        )}
      </HStack>
    </HStack>
  );
}
