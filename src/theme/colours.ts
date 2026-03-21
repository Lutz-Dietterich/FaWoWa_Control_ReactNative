const colours = {
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B0B0",
    accent: "#39FF14",
  },

  background: {
    overlay: "rgba(0, 0, 0, 0.35)",
    card: "rgba(0, 0, 0, 0.45)",
    dark: "#1A2E1A",
  },

  status: {
    active: "#39FF14",
    inactive: "#555555",
    warning: "#FFA500",
  },

  shadow: {
    default: "#000000",
  },
} as const;

export default colours;
