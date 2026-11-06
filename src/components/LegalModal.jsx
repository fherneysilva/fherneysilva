import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "../styles/LegalModal.css";
import { useLanguage } from "../i18n/useLanguage";

const LegalModal = ({ doc, onClose }) => {
  const { t } = useLanguage();

  if (!doc) return null;

  const isPrivacy = doc === "privacy";
  const title = isPrivacy ? t.legal.privacyTitle : t.legal.termsTitle;
  const updated = isPrivacy ? t.legal.privacyUpdated : t.legal.termsUpdated;
  const body = isPrivacy ? t.legal.privacyBody : t.legal.termsBody;

  return (
    <Dialog open={Boolean(doc)} onClose={onClose} maxWidth="sm" fullWidth className="legal-modal">
      <DialogTitle className="legal-modal-title">{title}</DialogTitle>
      <DialogContent dividers className="legal-modal-content">
        <p className="legal-modal-updated">{updated}</p>
        {body.map((paragraph, i) => (
          <p key={i} className="legal-modal-paragraph">
            {paragraph}
          </p>
        ))}
      </DialogContent>
      <DialogActions className="legal-modal-actions">
        <button type="button" className="legal-modal-close" onClick={onClose}>
          {t.legal.close}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default LegalModal;
