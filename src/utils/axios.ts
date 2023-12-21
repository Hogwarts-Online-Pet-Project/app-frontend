import { useUserStore } from '@/stores/user';
import axios, { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'

// TODO: ADD ENV SUPPORT
const BASE_URL = "/api/v1"

const api = axios.create({
    baseURL: BASE_URL
})

const rft_instance = axios.create({
    baseURL: BASE_URL
})

function refresh_token() {
    const userStore = useUserStore()
    let r = rft_instance.post('/auth/refreshToken', userStore.token)
    return r
}

api.interceptors.response.use(
    response => response,
    async (err) => {
        const originalConfig = err.config;
        const userStore = useUserStore()
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refresh_token();
                    const { accessToken } = rs.data;
                    userStore.token = rs.data
                    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                    // console.log("AXIOS INTERCEPTOP: " + api.defaults.headers.common['Authorization']);
                    setTimeout(() => { toast.info("Маркер доступа обновлён") }, 300)
                    return api.request(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        setTimeout(() => { toast.error("Маркера доступа не был обновлён") }, 300)
                        userStore.user_logout()
                        return Promise.reject(_error.response.data);
                    }
                    setTimeout(() => { toast.error("Маркера доступа не был обновлён") }, 300)
                    userStore.user_logout()
                    return Promise.reject(_error);
                }
            }
            if ((err.response.status === 400 || err.response.status === 403 || err.response.status === 404) && err.response.data) {
                setTimeout(() => { toast.error(err.response.data.message) }, 300)
                return Promise.reject(err.response.data);
            }
        }
        setTimeout(() => { toast.error("Произошла внутренняя ошибка, сообщите администратору.") }, 300)
        userStore.user_logout()
        return Promise.reject(err);
    }
);


export default api;

