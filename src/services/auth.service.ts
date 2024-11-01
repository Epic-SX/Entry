import { LoginSchema, TLoginRequest } from "@/schemas";
import { HttpService } from "@/services";
import { TLoginResponse } from "@/types";
import Cookies from 'js-cookie';
import { ACESS_TOKEN, IS_LOGOUTED, LAST_VISITED_PATH, LOGIN_INFO, message } from "@/constants";
import { useAlertStore } from "@/stores";
import { AxiosError } from "axios";
import { navigate } from "@/actions";
import { api_routes, auth_routes, private_routes} from "@/routes";

class AuthService {
    /**
      * 提供されたログイン要求を使用してユーザーを非同期的にログインします。
      *
      * @param {TLoginRequest} loginRequest - ユーザーのログイン資格情報を含むログイン要求オブジェクト。
      * @return {Promise<TLoginResponse>} ログイン応答オブジェクトに解決される Promise。
      */
    async login(loginRequest: TLoginRequest): Promise<TLoginResponse> {
        const http = HttpService.http(true);
        await http.get(api_routes.csrf);
        if (LoginSchema.safeParse(loginRequest).success) {
            return HttpService.post<TLoginResponse>(api_routes.login, loginRequest);
        } else {
            throw new Error('Invalid credentials');
        }
    }
    /**
      * ログアウト API ルートに POST リクエストを送信して、ユーザーをログアウトします。
      *
      * @return {Promise<boolean>} ユーザーが正常にログアウトした場合は True
      */
    async logout(): Promise<boolean> {
        await HttpService.post(api_routes.logout);
        return true;
    }
    /**
     * ログイン成功後のアクションを処理するメソッド。
     * @param {string} callbackUrl - ログイン後のリダイレクトのためのオプションのコールバック URL
     */
    onLoginSuccess(data: TLoginResponse,callbackUrl?: string | null) {
        useAlertStore.getState().hideAlert();
        // トークンを設定 expires: 5 hours
        Cookies.set(ACESS_TOKEN, data.access_token, {
            expires: 5 / 24
        });
        const loginInfoString = `${data.user.name};${data.user.role}`;
        Cookies.set(LOGIN_INFO, loginInfoString);
        const lastVisitedPath = Cookies.get(LAST_VISITED_PATH);
        if (lastVisitedPath) {
            navigate(lastVisitedPath);
        }else if (callbackUrl) {
            if (callbackUrl[0] !== '/') {
                callbackUrl = `/${callbackUrl}`;
            }
            navigate(`${callbackUrl}`);
        } else {
            navigate(private_routes.default);
        }
        sessionStorage.removeItem("callbackUrl");
    }
    /**
     * ※ログイン失敗時の対応機能です。 */
    onLoginFail(error: any) {
        let errorMessage = message.default_error;
        if (error instanceof AxiosError) {
            errorMessage = error.response?.data.message;
        }
        // useAlertStore.getState().showAlert({ title: errorMessage, type: "fail" });
        this.clearCookie();
        navigate(auth_routes.login);
    }
    /**
     * ログアウト成功後のアクションを処理するメソッド
     */
    onLogoutSuccess() {
        this.clearCookie();
        Cookies.set(IS_LOGOUTED, "true");
        navigate(auth_routes.login);
    }
    /**
     * Cookie の有効期限が切れた場合のアクションを処理するメソッド
     */
    onCookieExpired() {
        useAlertStore.getState().showAlert({ title: message.cookies_expired, type: "warning" });
        this.clearCookie();
    }
    /**
     * 
     * @returns {null | {name: string, role: number}} ログイン情報。ログインしていない場合は null
     */
    getLoginInfoFromCookie(): null | { name: string; role: number; } {
        const infoAsString = Cookies.get(LOGIN_INFO);
        if (infoAsString) {
            const [name, role] = infoAsString.split(';');
            return { name, role: parseInt(role) };
        } else {
            return null;
        }
    }
    /**
     * 
     * @returns {boolean} ログインしている場合は True
     */
    isLoggedIn(): boolean {
        return this.getAccessToken() !== undefined;
    }
    /**
     * 
     * @returns {boolean} ログインしていない場合は True
     */
    isCookieExpired(): boolean {
        const accessToken = this.getAccessToken();
        const loginInfo = Cookies.get(LOGIN_INFO);
        if (!accessToken && loginInfo) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 
     * @returns {string | undefined} アクセストークン
     */
    getAccessToken(): string | undefined {
        return Cookies.get(ACESS_TOKEN);
    }
    /**
     * 
     * @returns {void} ログイン情報
     */
    clearCookie(): void {
        Cookies.remove(ACESS_TOKEN);
        Cookies.remove(LOGIN_INFO);
    }
}
const authService = new AuthService();

export default authService;