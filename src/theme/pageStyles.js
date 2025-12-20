import { THEME } from "./theme";

export const Page = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    padding: THEME.spacing.pagePadding,
    background: THEME.colors.bgPage,
  },

  title: {
    fontSize: 26,
    fontWeight: 800,
    color: THEME.colors.textDark,
    marginBottom: 24,
    textAlign: "center",
  },

  card: {
    background: THEME.colors.bgCard,
    borderRadius: THEME.radius.lg,
    padding: 28,
    boxShadow: THEME.shadow.card,
  },
};
