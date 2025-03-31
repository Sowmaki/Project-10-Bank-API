export const setStoredUser = (token, user, rememberMe) => {
  localStorage.setItem('rememberMe', rememberMe);
  if (rememberMe) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

};

export const getStoredUser = () => {
  try {
    return localStorage.getItem('rememberMe') === 'true'
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  } catch (error) {
    console.error("Erreur de parsing du user depuis localStorage:", error);
    return null;
  }
};