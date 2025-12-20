import { THEME } from "./theme";

export const Form = {
  group: { marginBottom: 16 },

  label: {
    fontWeight: 600,
    marginBottom: 6,
    color: THEME.colors.textDark,
    display: "block",
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: THEME.radius.md,
    border: `1px solid ${THEME.colors.primary}`,
    background: THEME.colors.primaryLight,
  },

  button: {
    width: "100%",
    padding: 14,
    background: THEME.colors.primary,
    color: "#fff",
    borderRadius: THEME.radius.md,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },

  error: {
    background: "#fee2e2",
    color: THEME.colors.danger,
    padding: 12,
    borderRadius: THEME.radius.md,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: 600,
  },
};
