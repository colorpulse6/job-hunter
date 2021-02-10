export default {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://job-toast.herokuapp.com"
      : "http://localhost:5000",
};
