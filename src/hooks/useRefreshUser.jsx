import { useAuthContext } from './useAuthContext';

export const useRefreshUser = () => {
  const { refreshUser } = useAuthContext();

  const refreshUserData = async () => {
    try {
      const success = await refreshUser();
      if (success) {
        console.log('User data refreshed successfully');
      } else {
        console.error('Failed to refresh user data');
      }
      return success;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return false;
    }
  };

  return { refreshUserData };
}; 