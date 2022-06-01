import React from 'react'
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import PostsProvider from './contexts/PostsProvider'
import AddReffererScreen from './screens/AddReffererScreen'
import ChartsScreen from './screens/ChartsScreen'
import Dashboard from './screens/Dashboard'
import DashboardPrp from './screens/DashboardPrp'
import Home from './screens/Home'
import InfoSede from './screens/InfoSede'
import Login from './screens/Login'
import MethodPay from './screens/MethodPay'
import MyCitas from './screens/MyCitas'
import Mypurchases from './screens/mypurchases'
import NewCita from './screens/NewCita'
import PaymentSummary from './screens/PaymentSummary'
import PayToCard from './screens/PayToCard'
import PayToNequi from './screens/PayToNequi'
import PayToOther from './screens/PayToOther'
import PerfilUser from './screens/PerfilUser'
import PostsDetailScreen from './screens/PostsDetailScreen'
import Procedure from './screens/ourprocedures/procedur'
import ProceduresList from './screens/ourprocedures/proceduresList'
import ProceduresView from './screens/ourprocedures/proceduresView'
import ProcessListScreen from './screens/ProcessListScreen'
import ProcessDetailScreen from './screens/ProcessDetailScreen'
import RecoveryAccount from './screens/RecoveryAccount'
import RefferedDetailScreen from './screens/RefferedDetailScreen'
import ReferredListScreen from './screens/ReferredListScreen'
import Register from './screens/Register'
import SheduleValoration from './screens/SheduleValoration'
import Shop2 from './screens/Shop2'
import ShopCar from './screens/ShopCar'
import ShopProductsView from './screens/ShopProductsView'
import Splash from './screens/Splash.js'
import UserProvider from './contexts/UserProvider'
import WishList from './screens/wishlist'
import Animates from './screens/animates.js'
import Quotation from './screens/AddQuotation';

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <PostsProvider>
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen headerMode={'none'} name="Home" component={Home} />
            <Stack.Screen headerMode={'none'} name="Animates" component={Animates} />
            <Stack.Screen headerMode={'none'} name="Login" component={Login} />
            <Stack.Screen headerMode={'none'} name="Register" component={Register} />
            <Stack.Screen headerMode={'none'} name="Dashboard" component={Dashboard} />
            <Stack.Screen headerMode={'none'} name="SheduleValoration" component={SheduleValoration} />
            <Stack.Screen headerMode={'none'} name="DashboardPrp" component={DashboardPrp} />
            <Stack.Screen headerMode={'none'} name="ReferredListScreen" component={ReferredListScreen} />
            <Stack.Screen headerMode={'none'} name="AddReffererScreen" component={AddReffererScreen} />
            <Stack.Screen headerMode={'none'} name="ProcessListScreen" component={ProcessListScreen} />
            <Stack.Screen headerMode={'none'} name="ProcessDetailScreen" component={ProcessDetailScreen} />
            <Stack.Screen headerMode={'none'} name="ChartsScreen" component={ChartsScreen} />
            <Stack.Screen headerMode={'none'} name="PostsDetailScreen" component={PostsDetailScreen} />
            <Stack.Screen headerMode={'none'} name="Shop2" component={Shop2} />
            <Stack.Screen headerMode={'none'} name="ShopProductsView" component={ShopProductsView} />
            <Stack.Screen headerMode={'none'} name="ShopCar" component={ShopCar} />
            <Stack.Screen headerMode={'none'} name="InfoSede" component={InfoSede} />
            <Stack.Screen headerMode={'none'} name="PerfilUser" component={PerfilUser} />
            <Stack.Screen headerMode={'none'} name="Mypurchases" component={Mypurchases} />
            <Stack.Screen headerMode={'none'} name="MethodPay" component={MethodPay} />
            <Stack.Screen headerMode={'none'} name="PayToCard" component={PayToCard} />
            <Stack.Screen headerMode={'none'} name="PayToNequi" component={PayToNequi} />
            <Stack.Screen headerMode={'none'} name="PayToOther" component={PayToOther} />
            <Stack.Screen headerMode={'none'} name="PaymentSummary" component={PaymentSummary} />
            <Stack.Screen headerMode={'none'} name="ProceduresList" component={ProceduresList} />
            <Stack.Screen headerMode={'none'} name="ProceduresView" component={ProceduresView} />
            <Stack.Screen headerMode={'none'} name="Procedure" component={Procedure} />
            <Stack.Screen headerMode={'none'} name="MyCitas" component={MyCitas} />
            <Stack.Screen headerMode={'none'} name="NewCita" component={NewCita} />
            <Stack.Screen headerMode={'none'} name="WishList" component={WishList} />
            <Stack.Screen headerMode={'none'} name="RefferedDetailScreen" component={RefferedDetailScreen} />
            <Stack.Screen headerMode={'none'} name="RecoveryAccount" component={RecoveryAccount} />
            <Stack.Screen headerMode={'none'} name="Splash" component={Splash} />
            <Stack.Screen headerMode={'none'} name="Quotation" component={Quotation} />
          </Stack.Navigator>
        </PostsProvider>
      </UserProvider>
    </NavigationContainer>
  )
}



// const Stack = createStackNavigator();
// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode={'none'} >
//       {/* <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} /> */}
//         <Stack.Screen headerMode={'none'} name='Home' component={Home}  />
//         <Stack.Screen headerMode={'none'} name='Shop2' component={Shop2}  />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

console.disableYellowBox = true
export default App;