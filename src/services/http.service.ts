import { ACESS_TOKEN, API_URL, TRANSLATION_KEY, message } from "@/constants";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import { authService } from ".";
import { useAlertStore, usePendingAlertStore } from "@/stores";
import { navigate } from "@/actions";
import { auth_routes } from "@/routes";
import { isDevEnv } from "@/libs";

class HttpService {

    /**
     * axios インスタンスを作成する
     * @returns {AxiosInstance} Axios インスタンス
     */

    public static http(noPrefixApi: boolean = false): AxiosInstance {
        const url = noPrefixApi ? API_URL : `${API_URL}/api`;
        const axiosIntance = axios.create({
            baseURL: url || "http://localhost:3000/api",
        });
        axiosIntance.interceptors.request.use(async (config) => {
            const accessToken = Cookies.get(ACESS_TOKEN);
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            if (isDevEnv()) {
                console.log('config request:', config);
            }
            return config;
        });
        axiosIntance.interceptors.response.use(
            res => {
                if (isDevEnv()) {
                    console.log('response:', res);
                }
                return res
            },
            error => {
                if (isDevEnv()) {
                    console.log('error:', error);
                }
                return this.handleError(error);
            }
        )
        return axiosIntance;
    }
    private static handleError(error: any) {
        let errorMessage = message.default_error;
        let error_key = TRANSLATION_KEY.ERROR_500;
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            const errorMessageServer = error.response?.data?.error_message;
            if (status) {
                switch (status) {
                    case 400:
                        errorMessage = errorMessageServer || message.error_400;
                        error_key = TRANSLATION_KEY.ERROR_400;
                        break;
                    case 401:
                        return this.onUnauthorized(error, errorMessageServer);
                    case 403:
                        errorMessage = errorMessageServer || message.error_403;
                        error_key = TRANSLATION_KEY.ERROR_403;
                        break;
                    case 404:
                        errorMessage = errorMessageServer || message.error_404;
                        error_key = TRANSLATION_KEY.ERROR_404;
                        break
                    case 405:
                        errorMessage = errorMessageServer || message.error_405;
                        error_key = TRANSLATION_KEY.ERROR_405;
                        break
                    case 422:
                        errorMessage = errorMessageServer || message.error_422;
                        error_key = TRANSLATION_KEY.ERROR_422;
                        break;
                    default:
                        break;
                }
            }
            else if (error.code === "ERR_NETWORK") {
                errorMessage = message.error_network;
                error_key = TRANSLATION_KEY.ERROR_NETWORK;
            }
        }
        useAlertStore.getState().showAlert({
            title: errorMessage,
            type: "fail",
            translationKey: error_key,
            rootTranslationKey: TRANSLATION_KEY.API_MESSAGE
        });
        return Promise.reject(error);
    }
    private static onUnauthorized(error: AxiosError, errorMessage?: string) {
        const fromPath = window.location.pathname;
        const isExpired = authService.isCookieExpired();
        const requestApiUrl = error.config?.url || "";
        let navigateUrl = auth_routes.login;
        if (fromPath && !fromPath.includes('login')) {
            navigateUrl = `${auth_routes.login}?callbackUrl=${fromPath}`
        }
        if (isExpired) {
            navigate(navigateUrl);
        } else {
            if (requestApiUrl.includes("login") || requestApiUrl.includes("auth/callback")) {
                useAlertStore.getState().showAlert({
                    title: (errorMessage || message.error_401),
                    type: "fail",
                    translationKey: TRANSLATION_KEY.ERROR_401,
                    rootTranslationKey: TRANSLATION_KEY.API_MESSAGE
                });
            } else {
                navigate(navigateUrl);
            }
        }
        return Promise.reject(error);
    }
    /**
     * API プレフィックスなしで axios インスタンスを作成する
     * @returns {AxiosInstance} Axios インスタンス
     */
    public static httpNoApiPrefix(): AxiosInstance {
        const axiosIntance = axios.create({
            baseURL: API_URL || "http://localhost:3000",
        });
        return axiosIntance;
    }

    /**
     * HTTP GET リクエスト を行う
     * @param url  
     * @param config 
     * @returns {Promise<T>} 
     */
    public static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            // usePendingAlertStore.getState().showAlert();
            const http = this.http();
            const response = await http.get(url, config);
            return response.data;
        } finally {
            //usePendingAlertStore.getState().hideAlert();
        }
    }
    /**
     * HTTP POST リクエスト を行う
     * @param url 
     * @param data 
     * @param config 
     * @returns {Promise<T>}
     */
    public static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            usePendingAlertStore.getState().showAlert();
            const http = this.http();
            const response = await http.post(url, data, config);
            return response.data;
        } finally {
            usePendingAlertStore.getState().hideAlert();
        }
    }
    /**
     * HTTP PUT リクエスト を行う
     * @param url 
     * @param data 
     * @param config 
     * @returns {Promise<T>}
     */
    public static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            usePendingAlertStore.getState().showAlert();
            const http = this.http();
            const response = await http.put(url, data, config);
            return response.data;
        } finally {
            usePendingAlertStore.getState().hideAlert();
        }
    }
    /**
     * HTTP DELETE リクエスト を行う
     * @param url 
     * @param config 
     * @returns {Promise<T>}
     */
    public static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            usePendingAlertStore.getState().showAlert();
            const http = this.http();
            const response = await http.delete(url, config);
            return response.data;
        } finally {
            usePendingAlertStore.getState().hideAlert();
        }
    }
    /**
     * HTTP PATCH リクエスト を行う
     * @param url 
     * @param data 
     * @param config 
     * @returns {Promise<T>}
     */
    public static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            usePendingAlertStore.getState().showAlert();
            const http = this.http();
            const response = await http.patch(url, data, config);
            return response.data;
        } finally {
            usePendingAlertStore.getState().hideAlert();
        }
    }
    public static async uploadFile<R = any>(url: string, data: FormData, config?: AxiosRequestConfig): Promise<R> {
        return HttpService.post(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
            ...config
        });
    }
}

export default HttpService;