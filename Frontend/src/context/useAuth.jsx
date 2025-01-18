import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * A custom hook to access authentication state and functions
 * from the AuthContext.
 * @returns {object} Auth context value.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
