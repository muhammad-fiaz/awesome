import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieState {
  consentAccepted: boolean | null; // null = not chosen, true = accepted, false = declined
  setConsent: (accepted: boolean) => void;
  resetConsent: () => void;
}

export const useCookieStore = create<CookieState>()(
  persist(
    (set) => ({
      consentAccepted: null,
      setConsent: (consentAccepted) => set({ consentAccepted }),
      resetConsent: () => set({ consentAccepted: null }),
    }),
    {
      name: 'awesome-cookie-consent',
    },
  ),
);
