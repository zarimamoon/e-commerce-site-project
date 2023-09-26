import axios from 'axios';

// Function to login and get a token
export const login = async (username, password, authToken) => {
  try {
    const response = await axios.post(
      'https://fakestoreapi.com/auth/login',
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      }
    );

    const { token } = response.data;
    return token;
  } catch (error) {
    throw error;
  }
};