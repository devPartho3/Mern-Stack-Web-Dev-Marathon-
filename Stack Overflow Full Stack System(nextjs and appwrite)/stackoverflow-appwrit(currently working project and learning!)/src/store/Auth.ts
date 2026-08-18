import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  sethydrated: () => void;

  verifysession: () => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  createAccount: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      sethydrated: () => {
        set((state) => {
          state.hydrated = true;
        });
      },

      verifysession: async () => {
        try {
          const session = await account.getSession("current");

          set((state) => {
            state.session = session;
          });
        } catch {
          set((state) => {
            state.session = null;
          });
        }
      },

      login: async (email, password) => {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );

          set((state) => {
            state.session = session;
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error as AppwriteException,
          };
        }
      },

      createAccount: async (name, email, password) => {
        try {
          await account.create(
            "unique()",
            email,
            password,
            name
          );

          await account.createEmailPasswordSession(email, password);
          const [user,{jwt}] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT()
          ]);
          if(!user.prefs?.reputation) {
            await account.updatePrefs({
              reputation: 0
            });
          }

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error as AppwriteException,
          };
        }
      },

      logout: async () => {
        try {
          await account.deleteSession("current");

          set((state) => {
            state.session = null;
            state.user = null;
          });
        } catch {}
      },
    })),
    {
      name: "auth",
      onRehydrateStorage: () => (state) => {
        state?.sethydrated();
      },
    }
  )
);