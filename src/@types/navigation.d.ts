export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      AuthLoading: undefined;
      Entrar: undefined;
      CriarConta: undefined;
      Home: undefined;
      CreateCar: undefined;
      CreateGroup: undefined;
      Contacts: undefined;
      Cars: undefined;
      Group: undefined;
      Apps: undefined;
      Notifications: undefined;
      GroupScreen: undefined;
      Security:undefined;
      CarsScreen: undefined;
      ForgotPassword: undefined;
      signUp: undefined;
      signIn: undefined;
      Groups: undefined;
      VerifyPassword: {
        email: string;
      };
      SuccessPassword: {
        email: string;
        code: string;
      };
      PassLoading: {
        email: string;
        code: string;
      };
    }
  }
}
