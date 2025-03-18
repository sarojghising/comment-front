const API_BASE_URL = 'http://localhost:8000/api'; 

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export { API_BASE_URL, getAuthHeader };