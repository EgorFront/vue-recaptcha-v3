import { load as loadReCaptcha, ReCaptchaInstance } from 'recaptcha-v3'
import { App, Ref, ref, inject, InjectionKey } from 'vue'
import { IReCaptchaOptions } from './IReCaptchaOptions'

const VueReCaptchaInjectKey: InjectionKey<IReCaptchaComposition> = Symbol('VueReCaptchaInjectKey')

interface IGlobalConfig {
  error: Error | null
}
const globalConfig: IGlobalConfig = {
  error: null
}

const isLoaded = ref(false)
const instance: Ref<ReCaptchaInstance | undefined> = ref(undefined)

export const VueReCaptcha = {
  install (app: App<Element>, options: IReCaptchaOptions) {
    app.config.globalProperties.$recaptchaLoaded = recaptchaLoaded(isLoaded)

    if (options.instantLoading) void deferLoading(app, options)

    app.provide(VueReCaptchaInjectKey, {
      instance,
      isLoaded,
      executeRecaptcha: recaptcha(instance),
      recaptchaLoaded: recaptchaLoaded(isLoaded),
      deferLoading: async () => await deferLoading(app, options)
    })
  }
}

export function useReCaptcha (): IReCaptchaComposition | undefined {
  return inject(VueReCaptchaInjectKey)
}

async function deferLoading (app: App<Element>, options: IReCaptchaOptions): Promise<void> {
  try {
    const wrapper = await initializeReCaptcha(options)

    isLoaded.value = true
    instance.value = wrapper

    app.config.globalProperties.$recaptcha = recaptcha(instance)
    app.config.globalProperties.$recaptchaInstance = instance
  } catch (error) {
    globalConfig.error = error
  }
}

async function initializeReCaptcha (options: IReCaptchaOptions): Promise<ReCaptchaInstance> {
  console.log('Load ReCaptcha with options:')
  console.log(options)
  console.log(window.navigator.language)
  return await loadReCaptcha(options.siteKey, options.loaderOptions)
}

function recaptchaLoaded (isLoaded: Ref<boolean>) {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  return () => new Promise<boolean>((resolve, reject) => {
    if (globalConfig.error !== null) {
      return reject(globalConfig.error)
    }

    return resolve(isLoaded.value)
  })
}

function recaptcha (instance: Ref<ReCaptchaInstance | undefined>) {
  return async (action: string): Promise<string | undefined> => {
    return await instance.value?.execute(action)
  }
}

export interface IReCaptchaComposition {
  isLoaded: Ref<boolean>
  instance: Ref<ReCaptchaInstance | undefined>
  executeRecaptcha: (action: string) => Promise<string>
  recaptchaLoaded: () => Promise<boolean>
  deferLoading: () => Promise<void>
}
