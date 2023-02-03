import { ReCaptchaInstance } from 'recaptcha-v3';
import _Vue from 'vue';
import { IReCaptchaOptions } from './IReCaptchaOptions';
export declare function VueReCaptcha(Vue: typeof _Vue, options: IReCaptchaOptions): void;
declare module 'vue/types/vue' {
    interface Vue {
        $recaptcha(action: string): Promise<string>;
        $recaptchaLoaded(): Promise<boolean>;
        $recaptchaInstance: ReCaptchaInstance;
    }
}
