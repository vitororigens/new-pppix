export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            login: undefined;
            home: undefined;
            cars: undefined;
            createCar: undefined;
            createGroup: undefined;
            createAccount: undefined;
            person: undefined;
            sucess: { email?: string, code?: string };
            verify: { email?: string };
            groups: undefined;
            security: undefined;
            notifications: undefined;
            forgetpassword: undefined;
            passloading: { email?: string, code?: string };
        }
    }
}