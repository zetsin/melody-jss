const store = {
  theme: {},
  listeners: [],
}

export const getTheme = () => store.theme

export const setTheme = (theme=store.theme) => {
  store.theme = theme
  store.listeners.map(listener => listener(theme))
}

export const onChange = listener => store.listeners = [...store.listeners, listener]
