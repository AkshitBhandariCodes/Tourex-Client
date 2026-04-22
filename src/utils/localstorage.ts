const getSafeStorage = (): Storage | null => {
   if (typeof window === "undefined") {
      return null;
   }

   const storage = window.localStorage;
   if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
      return null;
   }

   return storage;
};

export const setLocalStorage = <T>(name: string, items: T[]): void => {
   const storage = getSafeStorage();
   if (!storage) {
      return;
   }

   storage.setItem(name, JSON.stringify(items));
};

export const getLocalStorage = <T>(name: string): T[] => {
   const storage = getSafeStorage();
   if (!storage) {
      return [];
   }

   const data = storage.getItem(name);
   if (!data) {
      return [];
   }

   try {
      return JSON.parse(data) as T[];
   } catch {
      return [];
   }
};
