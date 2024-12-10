const { createStore } = require('zustand/vanilla');

const useGlobalStore = createStore((set) => ({
  langsExtract: [],
  configs: {},
  filesContent: {},
  addLangs: (text) => set((state) => ({ ...state, langsExtract: [...state.langsExtract, text] })),
  setConfigs: (configs) => set((state) => ({ ...state, configs })),
  setFilesContent: (filesContent) => set((state) => ({ ...state, filesContent })),
}))

const { getState, setState, subscribe, getInitialState } = useGlobalStore

exports.getState = getState;
exports.setState = setState;
exports.subscribe = subscribe;
exports.getInitialState = getInitialState;