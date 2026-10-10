const config = {
  // Use localhost when running locally, and the live URL when deployed
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://amigowebster.in/sansirong'
};

export default config;
