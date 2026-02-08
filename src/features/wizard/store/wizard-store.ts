import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StylePresetId, DEFAULT_STYLE_PRESET } from '../constants/presets';
import { FontPairingId, DEFAULT_FONT_PAIRING } from '../constants/fonts';

interface PropertyData {
  price?: number;
  title?: string;
  location?: string;
  images?: string[]; // Added for Epic 3.1
  stylePreset?: StylePresetId; // Added for Story 3.4
  fontPairing?: FontPairingId; // Added for Story 3.5
  [key: string]: unknown;
}

const WIZARD_STORAGE_KEY = 'buildr-wizard-draft';

interface WizardState {
  propertyData: PropertyData;
  propertyId: string | null;
  hasHydrated: boolean;
  storageError: string | null;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  lastSyncedAt: string | null;
  updatePropertyData: (data: Partial<PropertyData>) => void;
  resetWizard: () => void;
  setHasHydrated: (state: boolean) => void;
  setStorageError: (error: string | null) => void;
  setPropertyId: (id: string | null) => void;
  setSyncStatus: (status: 'idle' | 'syncing' | 'synced' | 'error') => void;
  setLastSyncedAt: (date: string | null) => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      propertyData: {
        stylePreset: DEFAULT_STYLE_PRESET,
        fontPairing: DEFAULT_FONT_PAIRING,
      },
      hasHydrated: false,
      storageError: null,
      propertyId: null,
      syncStatus: 'idle',
      lastSyncedAt: null,
      updatePropertyData: (data) =>
        set((state) => ({
          propertyData: { ...state.propertyData, ...data },
          // Reset sync status on change to trigger sync hook
          syncStatus: 'idle',
        })),
      resetWizard: () =>
        set({
          propertyData: {
            stylePreset: DEFAULT_STYLE_PRESET,
            fontPairing: DEFAULT_FONT_PAIRING,
          },
          propertyId: null,
          syncStatus: 'idle',
          lastSyncedAt: null,
        }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setStorageError: (error) => set({ storageError: error }),
      setPropertyId: (id) => set({ propertyId: id }),
      setSyncStatus: (status) => set({ syncStatus: status }),
      setLastSyncedAt: (date) => set({ lastSyncedAt: date }),
    }),
    {
      name: WIZARD_STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: (name) => localStorage.getItem(name),
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, value);
            useWizardStore.getState().setStorageError(null);
          } catch (error) {
            console.error('Wizard Storage Error:', error);
            if (error instanceof Error && error.name === 'QuotaExceededError') {
              useWizardStore.getState().setStorageError('Storage limit exceeded. Some changes may not be saved.');
            }
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      })),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          // Future migration logic here
          return persistedState as WizardState;
        }
        return persistedState as WizardState;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Cross-tab synchronization
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === WIZARD_STORAGE_KEY) {
      useWizardStore.persist.rehydrate();
    }
  });
  
  // Expose store for E2E testing using unknown for type safety
  (window as unknown as { useWizardStore: unknown }).useWizardStore = useWizardStore;
}
