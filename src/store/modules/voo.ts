import { Module } from 'vuex';
import { RootState } from '@/store';
import { Voo } from '@/types/voo'; // Certifique-se de que o caminho está correto
import { getVooById, getVoos, createVoo, updateVoo, deleteVooById } from '@/services/vooService'; // Certifique-se de que o caminho está correto

// Define o estado do módulo
export interface VooState {
  voos: Voo[];
  voo: Voo | null;
  loading: boolean;
  error: string | null;
}

const state: VooState = {
  voos: [],
  voo: null,
  loading: false,
  error: null,
};

const getters = {
  allVoos: (state: VooState) => state.voos,
  currentVoo: (state: VooState) => state.voo,
  isLoading: (state: VooState) => state.loading,
  error: (state: VooState) => state.error,
};

const mutations = {
  SET_VOOS(state: VooState, voos: Voo[]) {
    state.voos = voos;
  },
  SET_VOO(state: VooState, voo: Voo) {
    state.voo = voo;
  },
  SET_LOADING(state: VooState, loading: boolean) {
    state.loading = loading;
  },
  SET_ERROR(state: VooState, error: string | null) {
    state.error = error;
  },
};

const actions = {
  async fetchVoos({ commit }: { commit: Function }) {
    commit('SET_LOADING', true);
    try {
      const response = await getVoos();
      commit('SET_VOOS', response);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch voos.');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchVooById({ commit }: { commit: Function }, id: string) {
    commit('SET_LOADING', true);
    try {
      const response = await getVooById(id);
      commit('SET_VOO', response);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch voo details.');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async createVoo({ dispatch }: { dispatch: Function }, voo: Voo) {
    try {
      await createVoo(voo);
      dispatch('fetchVoos');
    } catch (error) {
      console.error('Failed to create voo.', error);
    }
  },

  async updateVoo({ dispatch }: { dispatch: Function }, { id, voo }: { id: string; voo: Partial<Voo> }) {
    try {
      await updateVoo(id, voo);
      dispatch('fetchVoos');
    } catch (error) {
      console.error('Failed to update voo.', error);
    }
  },

  async deleteVooById({ dispatch }: { dispatch: Function }, id: string) {
    try {
      await deleteVooById(id);
      dispatch('fetchVoos');
    } catch (error) {
      console.error('Failed to delete voo.', error);
    }
  },
};

export const vooModule: Module<VooState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
