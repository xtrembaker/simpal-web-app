// expected answer: Welcome to use SIMPAL-T2, your password is ####
export const createMessageDefineMaster = () => '#00#';

// expected answer: New master number set successfully
export const createMessageSetNewMaster = (phoneNumber) => `#10#${phoneNumber}#`;

// max 4 family's number
export const createMessageAddFamilyNumber = (phoneNumber) => `#08#${phoneNumber}#`;

export const createMessageListAllFamilyNumbers = () => '#08#';

export const createMessageDeleteFamilyNumber = (phoneNumber) => `#09#${phoneNumber}#`;

export const createMessageDeleteAllFamilyNumber = () => '#09#';

export const createMessageEnableFamilyNumberAlert = () => '#05#1#';

export const createMessageDisableFamilyNumberAlert = () => '#05#0#';

export const createMessageSwitchPassword = (previousPassword, newPassword) => `#11#${previousPassword}#${newPassword}#`;

export const createMessageGetTemperature = () => '#01#';

export const createMessageGetProbeTemperature = () => '#16#';

export const createMessageEnableTemperatureAlert = () => '#02#1#';

export const createMessageTemperatureRangeAlert = (min, max) => `#03#${min}#${max}#`;

export const createMessageDisableTemperatureAlert = () => '#02#0#';

export const createMessageProbeEnableTemperatureAlert = () => '#16#1#';

export const createMessageProbeTemperatureRangeAlert = (min, max) => `#17#${min}#${max}#`;

export const createMessageProbeDisableTemperatureAlert = () => '#16#0#';

/**
 * Jour : 0= tous les jours, 1 = Lundi, 2 = Mardi,... 8 = Lundi à Vendredi, 9 = Samedi à Dimanche
 * HeureDébut et Heure Fin : sous la forme de 4 chiffres (hh :mm) sous le format 24h. HeureDébut et HeureFin doivent être le même jour
 */
export const createMessageScheduleTemperatureAlert = (day, startTime, endTime, tempMin, tempMax, tempMin2, tempMax2) => {
    return `#07#${day}#${startTime}#${endTime}#${tempMin}#${tempMax}#${tempMin2}#${tempMax2}#`;
};

export const createMessageDisableScheduledTemperatureAlert = () => '#06#0#';

export const createMessageEnableFastTemperatureAlert = () => '#13#1#';

export const createMessageSetFastTemperatureAlert = (temp, duration) => `#14#${temp}#${duration}#`;

export const createMessageDisableFastTemperatureAlert = () => '#13#0#';

export const createMessageEnablePowerOutageAlert = () => '#04#1#';

export const createMessageDisablePowerOutageAlert = () => '#04#0#';

export const createMessageEnableLowGsmSignalAlert = () => '#15#1#';

export const createMessageDisableLowGsmSignalAlert = () => '#15#0#';

export const createMessageEnableDel = () => '#18#1#';

export const createMessageDisableDel = () => '#18#0#';

export const createMessageResetToFactorySettings = (password) => `#12#${password}#`;