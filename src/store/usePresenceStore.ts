import { create } from 'zustand';

interface PresenceStore {
  onlineUserIds: string[];
  setOnlineUserIds: (ids: string[]) => void;
  toggleUser: (id: string) => void;
}

export const usePresenceStore = create<PresenceStore>((set, get) => ({
  onlineUserIds: [],
  setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),
  toggleUser: (id) => {
    const { onlineUserIds } = get();
    set({
      onlineUserIds: onlineUserIds.includes(id)
        ? onlineUserIds.filter(uid => uid !== id)
        : [...onlineUserIds, id],
    });
  },
})); 