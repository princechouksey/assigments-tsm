import  axios  from "axios";


const instance  = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

// Attach token automatically from localStorage for every request
instance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers = config.headers || {};
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (err) {
            // ignore (e.g., SSR or private mode where localStorage isn't available)
        }
        return config;
    },
    (error) => Promise.reject(error),
);

    // Global response interceptor: if token expired / unauthorized, clear token and redirect to login
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;
            if (status === 401) {
                try {
                    localStorage.removeItem('token');
                } catch (e) {}
                // force navigation to login
                if (typeof window !== 'undefined') window.location.href = '/login';
            }
            return Promise.reject(error);
        },
    );

    export default instance
