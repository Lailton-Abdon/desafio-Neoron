import { createStore, Store } from 'vuex';
import { vooModule } from './modules/voo';

export interface RootState {}

export const store: Store<RootState> = createStore<RootState>({
  modules: {
    voo: vooModule,
  },
});

export default store;
