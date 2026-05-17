const TOKEN_KEY = "authToken";
const USER_KEY = "currentUser";

export const authService = {
  
  // Save login session
  setSession: (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);

    localStorage.setItem(USER_KEY, JSON.stringify({
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role
    }));
  },

  // Get user safely
  getAuthUser: () => {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error("Failed to parse user:", err);
      return null;
    }
  },

  // Get token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check login state
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get role (useful for RBAC later)
  getRole: () => {
    const user = authService.getAuthUser();
    return user?.role || null;
  },

  // Logout (clean + reusable)
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};