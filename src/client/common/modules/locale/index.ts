import { es } from 'date-fns/locale';
import i18next from 'i18next';

import { DateFormats } from '../../constants/date-formats';
import { IEnvironmentConfig } from '../../utilities/create-config';
import { setLocaleSettings } from '../../utilities/date';

export const init = (config: IEnvironmentConfig, onTransInitialized: () => void) => {
  setLocaleSettings({ locale: es, timezone: DateFormats.LIMA_TIMEZONE });
  const lng = 'es';
  const locales = require('../../../../resources/locales/*/trans.json');

  i18next.init(
    {
      lng,
      debug: config.i18nDebug,
      ns: ['trans'],
      defaultNS: 'trans',
      whitelist: ['en', 'es'],
      preload: ['es'],
      fallbackLng: 'es',
      resources: {
        [lng]: {
          trans: locales[lng],
        },
      },
    },
    () => {
      onTransInitialized && onTransInitialized();
    }
  );
};
