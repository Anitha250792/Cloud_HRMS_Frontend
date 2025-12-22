function ConfirmDeleteModal({ open, onClose, onConfirm, employee }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Deactivate Employee</h3>
        <p>
          Are you sure you want to deactivate <b>{employee.name}</b>?
        </p>

        <div style={styles.actions}>
          <button onClick={onClose} style={styles.cancel}>
            Cancel
          </button>
          <button onClick={onConfirm} style={styles.delete}>
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    width: 380,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  title: {
    fontWeight: 800,
    color: "#1e3a8a",
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  cancel: {
    background: "#e5e7eb",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontWeight: 600,
  },
  delete: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    fontWeight: 600,
  },
};
