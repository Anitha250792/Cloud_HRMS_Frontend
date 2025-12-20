import { THEME } from "../theme";

export default function PageLayout({ title, children }) {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    padding: "90px 24px",
    background: THEME.bgGradient,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: THEME.primaryDark,
    marginBottom: 25,
    textAlign: "center",
  },
};
