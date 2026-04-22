const createNoopStorage = (): Storage => {
   const store = new Map<string, string>();

   return {
      get length() {
         return store.size;
      },
      clear() {
         store.clear();
      },
      getItem(key: string) {
         return store.has(key) ? store.get(key)! : null;
      },
      key(index: number) {
         return Array.from(store.keys())[index] ?? null;
      },
      removeItem(key: string) {
         store.delete(key);
      },
      setItem(key: string, value: string) {
         store.set(key, String(value));
      },
   };
};

const hasStorageApi = (value: unknown): value is Storage => {
   return Boolean(
      value &&
         typeof (value as Storage).getItem === "function" &&
         typeof (value as Storage).setItem === "function" &&
         typeof (value as Storage).removeItem === "function" &&
         typeof (value as Storage).clear === "function"
   );
};

const currentStorage = (globalThis as { localStorage?: unknown }).localStorage;

if (!hasStorageApi(currentStorage)) {
   try {
      Object.defineProperty(globalThis, "localStorage", {
         value: createNoopStorage(),
         writable: true,
         configurable: true,
      });
   } catch {
      (globalThis as { localStorage?: Storage }).localStorage = createNoopStorage();
   }
}
