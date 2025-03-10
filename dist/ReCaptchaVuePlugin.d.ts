import { ReCaptchaInstance } from 'recaptcha-v3';
import { App, Ref } from 'vue';
import { IReCaptchaOptions } from './IReCaptchaOptions';
export declare const VueReCaptcha: {
    install(app: App<Element>, options: IReCaptchaOptions): void;
};
export declare function useReCaptcha(): IReCaptchaComposition | undefined;
export interface IReCaptchaComposition {
    isLoaded: Ref<boolean>;
    instance: Ref<ReCaptchaInstance | undefined>;
    executeRecaptcha: (action: string) => Promise<string>;
    recaptchaLoaded: () => Promise<boolean>;
    deferLoading: () => Promise<void>;
}
