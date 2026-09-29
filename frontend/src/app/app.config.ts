import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';

registerLocaleData(localePt); // formatos brasileiros (R$ 1.234,56)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), // rotas da aplicação
    provideHttpClient(), // habilita o HttpClient para chamar a API
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
