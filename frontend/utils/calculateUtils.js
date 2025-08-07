/**
 * Converts 12-hour time with AM/PM into decimal hours
 */
export const convertToDecimalHours = (time, ampm) => {
  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) return null;

  let [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;

  return hours + minutes / 60;
};

/**
 * Calculates total worked hours, handles overnight shifts
 */
export const calculateWorkedHours = (inTime, inAmPm, outTime, outAmPm) => {
  const inDecimal = convertToDecimalHours(inTime, inAmPm);
  const outDecimal = convertToDecimalHours(outTime, outAmPm);

  if (inDecimal === null || outDecimal === null) return 0;

  return outDecimal >= inDecimal
    ? outDecimal - inDecimal
    : 24 - inDecimal + outDecimal;
};

/**
 * Calculates salary based on hours and rate
 */
export const calculateSalary = (workedHours, rate, isLeave) => {
  if (isLeave || !rate || isNaN(rate)) return 0;
  return parseFloat((workedHours * rate).toFixed(2));
};

/**
 * Recalculates totalHours and salary for a list of entries
 */
export const recalculateEntries = (entries, rate) => {
  return entries.map((entry) => {
    const { inTime, inAmPm, outTime, outAmPm, leave } = entry;

    if (inTime && outTime) {
      const workedHours = calculateWorkedHours(inTime, inAmPm, outTime, outAmPm);
      const salary = calculateSalary(workedHours, rate, leave);
      return {
        ...entry,
        totalHours: workedHours,
        salary,
      };
    }
    return {
      ...entry,
      totalHours: 0,
      salary: 0,
    };
  });
};
