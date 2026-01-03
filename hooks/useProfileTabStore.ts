import { create } from "zustand";

type ProfileTab = "about" | "cars";

interface ProfileTabStore {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

export const useProfileTabStore = create<ProfileTabStore>((set) => ({
  activeTab: "about",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
