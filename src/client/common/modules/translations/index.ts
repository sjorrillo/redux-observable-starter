import { es } from 'date-fns/locale';

import { DateFormats } from '../../constants/date-formats';
import { setLocaleSettings } from '../../utilities/date';

export const init = () => {
  setLocaleSettings({ locale: es, timezone: DateFormats.LIMA_TIMEZONE });
};
