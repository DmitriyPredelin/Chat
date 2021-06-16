import moment from 'moment';
import 'moment/locale/ru';

const locale: any =
{
    lang: {
        locale: "ru_RU",
        placeholder: "Выберите дату",
        yearPlaceholder: "Выберите год",
        quarterPlaceholder: "Выберите квартал",
        monthPlaceholder: "Выберите месяц",
        weekPlaceholder: "Выберите неделю",
        rangePlaceholder: [
            "Начальная дата",
            "Конечная дата"
        ],
        rangeYearPlaceholder: [
            "Начальный год",
            "Год окончания"
        ],
        rangeMonthPlaceholder: [
            "Начальный месяц",
            "Конечный месяц"
        ],
        rangeWeekPlaceholder: [
            "Начальная неделя",
            "Конечная неделя"
        ],
        today: "Сегодня",
        now: "Сейчас",
        backToToday: "Текущая дата",
        ok: "ОК",
        clear: "Очистить",
        month: "Месяц",
        monthFormat: "YYYY-MM",
        year: "Год",
        timeSelect: "Выбрать время",
        dateSelect: "Выбрать дату",
        monthSelect: "Выбрать месяц",
        yearSelect: "Выбрать год",
        decadeSelect: "Выбрать десятилетие",
        yearFormat: "YY",
        dateFormat: "D/M/YYYY",
        dayFormat: "DD-MM-YYYY",
        dateTimeFormat: "D-MM-YYYY HH:mm:ss",
        monthBeforeYear: true,
        previousMonth: "Предыдущий месяц (PageUp)",
        nextMonth: "Следующий месяц (PageDown)",
        previousYear: "Предыдущий год (Control + left)",
        nextYear: "Следующий год (Control + right)",
        previousDecade: "Предыдущее десятилетие",
        nextDecade: "Следущее десятилетие",
        previousCentury: "Предыдущий век",
        nextCentury: "Следующий век",

    },
    timePickerLocale: {
        placeholder: "Выберите время",
        rangePlaceholder: [
            "Время начала",
            "Время окончания"
        ]
    }
}

moment.locale('ru', {
    months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsParseExact: true,
    weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    /*calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },*/

    /* dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
     ordinal : function (number) {
         return number + (number === 1 ? 'er' : 'e');
     },
     meridiemParse : /PD|MD/,
     isPM : function (input) {
         return input.charAt(0) === 'M';
     },*/

});


export default locale;