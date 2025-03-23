export const API_LOGIN_URL = "http://localhost:3001/api/v1/user/login";
export const API_PROFILE_URL = "http://localhost:3001/api/v1/user/profile";

// 🔐 Connexion de l'utilisateur
export const login = async (email, password) => {

  // fetch peut prendre deux arguments: 1.L'URL et 2.l'objet d'options qui 
  // permet de configurer la requête, comme la méthode HTTP, les en-têtes (headers), le corps de la requête (body), etc.
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur d'authentification");
  }

  const data = await response.json();
  return data.body.token;
};

// 👤 Récupérer les infos de l'utilisateur
export const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les informations utilisateur");
  }

  const data = await response.json();
  return data.body;
};
