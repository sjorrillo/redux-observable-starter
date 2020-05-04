import {
  format,
  formatDistance,
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  Locale,
  parse,
} from 'date-fns';
import { convertToTimeZone } from 'date-fns-timezone';
import { es } from 'date-fns/locale';

import { DateFormats } from '../constants/date-formats';

interface ILocaleInitializationArgs {
  locale?: Locale;
  timezone?: string;
}

interface IFormatDistanceOptions {
  baseDate?: Date | number;
  strict?: true;
  includeSeconds?: boolean;
  addSuffix?: boolean;
  timezone?: string;
}

interface IFormatOptions {
  format: string;
  timezone?: string;
}

export let locale: Locale = es;
export let timezone: string = DateFormats.LIMA_TIMEZONE;

export const now = (tz?: string) => convertToTimeZone(new Date(), { timeZone: tz || timezone });

export const setLocaleSettings = ({
  locale: _locale,
  timezone: tz,
}: ILocaleInitializationArgs = {}) => {
  timezone = tz || DateFormats.LIMA_TIMEZONE;
  locale = _locale || es;
};

export const parseDate = (date: string, { format: _format, timezone: tz }: IFormatOptions) => {
  const dateInput = parse(date, _format, now(tz), { locale });
  return convertToTimeZone(dateInput, { timeZone: tz || timezone });
};

export const formatDate = (
  date: Date | number,
  { format: _format, timezone: tz }: IFormatOptions
) => {
  const inputDate = convertToTimeZone(date, { timeZone: tz || timezone });
  return format(inputDate, _format, { locale });
};

export const formatDateDistnce = (
  date: Date | number,
  { baseDate, strict, includeSeconds, addSuffix = true, timezone: tz }: IFormatDistanceOptions = {}
) => {
  const dateInput = convertToTimeZone(date, { timeZone: tz || timezone });
  const baseDatInput = dateInput && convertToTimeZone(dateInput, { timeZone: tz || timezone });
  if (!baseDate) {
    return strict
      ? formatDistanceToNowStrict(dateInput, { addSuffix, locale })
      : formatDistanceToNow(dateInput, { includeSeconds, addSuffix, locale });
  }

  return strict
    ? formatDistanceStrict(dateInput, baseDatInput, { addSuffix, locale })
    : formatDistance(dateInput, baseDatInput, { includeSeconds, addSuffix, locale });
};
