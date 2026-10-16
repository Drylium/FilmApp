import { createStackNavigator } from "@react-navigation/stack";
import GenreScreen from "../screens/GenreScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import CreateCommentScreen from "../screens/CreateCommentScreen";
import EditCommentScreen from "../screens/EditCommentScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Genre">
      <Stack.Screen name="Genre" component={GenreScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MovieList" component={MovieListScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CreateComment" component={CreateCommentScreen} />
      <Stack.Screen name="EditComment" component={EditCommentScreen} />
    </Stack.Navigator>
  );
}