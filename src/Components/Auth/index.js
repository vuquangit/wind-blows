import { useDispatch } from "react-redux";
import { auth as firebaseAuth } from "firebase/app";
import { signOut } from "Redux/Profile/profile.action";

export class Auth {
  static useSignOut = () => {
    const dispatch = useDispatch();

    return async () => {
      await firebaseAuth().signOut();
      dispatch(signOut());
    };
  };
}
