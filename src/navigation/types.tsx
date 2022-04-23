/* eslint-disable prettier/prettier */
import { NavigatorScreenParams } from '@react-navigation/native';
export type MainStackParamList={
    TabNavigator: NavigatorScreenParams<TabNavigationParamList>
    LoginNavigation: NavigatorScreenParams<LoginstackParamList>;
};
export type LoginstackParamList={
    TabNavigator: {User:string}
    LoginScreen: undefined;
    RegisterScreen:undefined;
    ForgotPasswordSceen: undefined;
    UpdateUserInformation: undefined;
}
export type RootStackParamList={
    Main: NavigatorScreenParams<MainStackParamList>;
}
export type DashboardNavigationParamList={
    DashboardScreen: {displayname : String| undefined}
    ProductNavigation: undefined
    RoomNavigation:undefined
    ManageStaff:undefined
    ExpenseManager: undefined
    ChartNavigation : undefined
    MaterialManager: undefined
}
export type TabNavigationParamList={
    DashboardNavigation: {displayname : string| undefined}
    AccountNavigation: {displayname : string| undefined}
}
export type AccountNavigationParamList={
    AccountScreen:{displayname : string| undefined}
    SettingScreen: undefined,
}
export type ProductNavigationPramaList={
    ProductScreen: undefined,
  
    LisProductNavigation: undefined,
}
export type ListproductNavigationPramaList ={
    ListProductScreen: undefined,
    UpdateProductScreen: {id: string}
    AddproductScreen: undefined,
    ListMaterialScreen: undefined
    ListCategoryScreen: undefined
}
export type ManageEmployeePramaList ={
    MainScreen: undefined,
    EmployeeInformationParamList: undefined,
    AssignmentParamaList: undefined,
    Wages:undefined,
    AttendanceScreen: undefined,
    CreateAccount : undefined,
}
export type EmployeeInformationParamList= {
    ListStaffScreen: undefined,
    UserInformation:{id: string},
    AddstaffScreen:undefined,
    AttendanceScreen: undefined
}
export type ChartParamList={
    ChartScreen: undefined
}
export type  RoomParamList= {
    RoomScreen: undefined
    RoomEdit: {id :string}
    BookTable: {id:string}
    SwapTable: {id:string} ,
    callingWater: {id:string},
}
export type ExpenseParamList={
    ExpenseMainScreen: undefined
    AddExpenseScreen:undefined
    UpdateExpenseScreen: {id: string}
}
export type MaterialParamList={
    ListMaterialScreen: undefined
    AddMaterialScreen:undefined
    UpdateMaterialScreen: {id: string}
}
export type AssignmentParamaList = {
    Assignment: undefined
    ListGeneralTimeWork: undefined
}

