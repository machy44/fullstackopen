import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from './redux';
import { setCredentials, logout } from './redux/loginSlice';
import { useLoginMutation } from './services/login';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};

export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogListUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setCredentials(user));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('loggedInBlogListUser');
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await login({ username, password }).unwrap();
      window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user));
      dispatch(setCredentials(user));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleLogin,
    isLoading,
    user,
    handleLogout
  };
};
