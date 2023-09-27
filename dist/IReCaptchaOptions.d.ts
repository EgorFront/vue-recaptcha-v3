import { IReCaptchaLoaderOptions } from 'recaptcha-v3/dist/ReCaptchaLoader';
export interface IReCaptchaOptions {
    siteKey: string;
    instantLoading: boolean;
    loaderOptions: IReCaptchaLoaderOptions;
}
