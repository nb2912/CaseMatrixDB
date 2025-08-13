import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        background: "#1E3A5F",
        color: "#fff",
        textAlign: "center",
        padding: "16px 0",
        position: "fixed",
        left: 0,
        bottom: 0,
        zIndex: 100,
        fontSize: 15,
        letterSpacing: 0.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "2px solid rgba(255,255,255,0.1)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ opacity: 0.9 }}>
        &copy; {new Date().getFullYear()}{" "}
        <strong style={{ fontWeight: 600 }}>CaseMatrixDB</strong>. All rights
        reserved.
      </span>
    </footer>
  );
};

export default Footer;
