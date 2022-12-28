import authSlice from './authReducer';
import db from '../../firebase/config';

const { updateUserProfile, authStateChange, updateUserAvatar, logoutUser } = authSlice.actions;

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        displayName: name,
      });
      const { uid, displayName } = await db.auth().currentUser;

      const userUpdateProfile = {
        userId: uid,
        name: displayName,
        email: user.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authLogInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authLogoutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(logoutUser());
};

export const authAvatarChangeUser = avatar => async (dispatch, getState) => {
  const user = await db.auth().currentUser;
  await user.updateProfile({
    photoURL: avatar,
  });
  const { photoURL } = await db.auth().currentUser;
  dispatch(updateUserAvatar({ avatar: photoURL }));
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};