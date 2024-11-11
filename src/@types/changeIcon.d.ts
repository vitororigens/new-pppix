declare module "react-native-change-icon" {
  export function changeIcon(iconName: string): Promise<void>;
  export function getIcon(): Promise<string>;
}
