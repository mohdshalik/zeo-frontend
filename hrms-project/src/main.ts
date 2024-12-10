import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';


if (environment.production) {
  enableProdMode();
}

fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => {
    const providers = [
      { provide: 'APP_CONFIG', useValue: config }
    ];
    platformBrowserDynamic(providers).bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });