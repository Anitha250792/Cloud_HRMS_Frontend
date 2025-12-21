export const authStyles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#eef2ff,#f8fafc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 380,
    background: "#fff",
    borderRadius: 18,
    padding: "35px 30px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontSize: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  field: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },

  eye: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: 16,
  },

  button: {
    marginTop: 8,
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },

  alertError: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: "center",
  },

  alertSuccess: {
    background: "#dcfce7",
    color: "#166534",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: "center",
  },

  link: {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  },

  bottomText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: "center",
  },
};
