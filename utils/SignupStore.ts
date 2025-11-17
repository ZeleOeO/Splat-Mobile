type Personal = { firstName?: string; lastName?: string; email?: string };

let personal: Personal = {};
const STORAGE_KEY = "__signup_personal_v1";

async function persist(value: Personal) {
  try {
    const AsyncStorage = await import("@react-native-async-storage/async-storage");
    await AsyncStorage.default.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
  }
}

async function restore(): Promise<Personal> {
  try {
    const AsyncStorage = await import("@react-native-async-storage/async-storage");
    const raw = await AsyncStorage.default.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    // ignore
  }
  return {};
}

export async function setPersonal(data: Personal) {
  personal = { ...personal, ...data };
  await persist(personal);
}

export async function getPersonal(): Promise<Personal> {
  const restored = await restore();
  personal = { ...personal, ...restored };
  return personal;
}

export async function clearSignupStore() {
  personal = {};
  try {
    const AsyncStorage = await import("@react-native-async-storage/async-storage");
    await AsyncStorage.default.removeItem(STORAGE_KEY);
  } catch (err) {
    // ignore
  }
}

export default { setPersonal, getPersonal, clearSignupStore };
