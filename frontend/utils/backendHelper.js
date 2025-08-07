import { Alert } from 'react-native';
const BASE_URL = 'http://172.19.21.59:8080/api/salary';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Save all weekly entries to backend
 */
export const saveToBackend = async (timeEntries) => {
  try {
    const entriesToSave = timeEntries.map((entry, idx) => ({
      day: days[idx],
      inTime: entry.inTime,
      outTime: entry.outTime,
      totalHours: parseFloat(entry.hours) || 0,
      salary: parseFloat(entry.salary) || 0,
      leave: entry.isLeave,
    }));

    for (let entry of entriesToSave) {
      await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    }

    Alert.alert('Success', 'Weekly entries saved successfully.');
  } catch (error) {
    console.error('Save error:', error);
    Alert.alert('Error', 'Failed to save entries to backend.');
  }
};

/**
 * Load saved weekly entries from backend and map to local state structure
 */
export const loadFromBackend = async (setTimeEntries) => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const updatedEntries = days.map((day) => {
      const entry = data.find((e) => e.day === day);
      if (entry) {
        return {
          inTime: entry.inTime || '',
          inAmPm: entry.inTime?.toUpperCase().includes('PM') ? 'PM' : 'AM',
          outTime: entry.outTime || '',
          outAmPm: entry.outTime?.toUpperCase().includes('PM') ? 'PM' : 'AM',
          hours: entry.totalHours?.toFixed(2) || '-',
          salary: entry.salary?.toFixed(2) || '',
          isLeave: entry.leave,
        };
      } else {
        return {
          inTime: '',
          inAmPm: 'AM',
          outTime: '',
          outAmPm: 'PM',
          hours: '-',
          salary: '',
          isLeave: true,
        };
      }
    });

    setTimeEntries(updatedEntries);
  } catch (error) {
    console.error('Load error:', error);
    Alert.alert('Error', 'Failed to load entries from backend.');
  }
};


export const deleteAllWeeklyEntries = async (setTimeEntries) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete weekly entries');
    }

    // Reset frontend state after successful backend delete
    const clearedEntries = days.map(() => ({
      inTime: '',
      inAmPm: 'AM',
      outTime: '',
      outAmPm: 'PM',
      hours: '-',
      salary: '',
      isLeave: true,
    }));

    setTimeEntries(clearedEntries);

    Alert.alert('Success', 'All entries have been reset.');
  } catch (error) {
    console.error('Delete error:', error);
    Alert.alert('Error', 'Failed to delete entries from backend.');
  }
};

// Recalculate hours and salary for loaded entries
export function recalculateEntries(entries, rate) {
  return entries.map((entry) => {
    const hourlyRate = parseFloat(rate);
    const inTime = entry.inTime?.trim();
    const outTime = entry.outTime?.trim();

    if (!inTime && !outTime) {
      return { ...entry, hours: 'Leave', salary: '', isLeave: true };
    } else if (!inTime) {
      return { ...entry, hours: 'Intime Required', salary: 'Invalid', isLeave: true };
    } else if (!outTime) {
      return { ...entry, hours: 'Outtime Required', salary: 'Invalid', isLeave: true };
    } else {
      const inVal = convertToDecimalHours(inTime, entry.inAmPm);
      const outVal = convertToDecimalHours(outTime, entry.outAmPm);

      if (inVal === null || outVal === null || isNaN(hourlyRate)) {
        return { ...entry, hours: 'Invalid', salary: 'Invalid', isLeave: true };
      } else {
        let worked = outVal >= inVal ? outVal - inVal : (24 - inVal + outVal);
        return {
          ...entry,
          hours: worked.toFixed(2),
          salary: (worked * hourlyRate).toFixed(2),
          isLeave: false,
        };
      }
    }
  });
}

// helper to convert 12-hour time to decimal hours
function convertToDecimalHours(timeStr, amPm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
  if (!match) return null;

  let [_, hour, minute] = match.map(Number);

  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null;

  if (amPm === 'PM' && hour !== 12) hour += 12;
  if (amPm === 'AM' && hour === 12) hour = 0;

  return hour + minute / 60;
}

