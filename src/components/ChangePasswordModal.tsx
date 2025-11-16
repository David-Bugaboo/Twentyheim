import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { changePassword } from "../services/auth.service";
import { setAuthToken } from "../services/apiClient";

interface ChangePasswordModalProps {
  open: boolean;
  accessToken: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  accessToken,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setPassword("");
      setConfirmPassword("");
      setSubmitting(false);
      setError(null);
    }
  }, [open]);

  const getErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
      const data = error.response?.data as
        | { message?: string; error?: string }
        | undefined;
      return (
        data?.message ||
        data?.error ||
        error.response?.statusText ||
        "Falha ao alterar senha."
      );
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Falha ao alterar senha.";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    // Validações
    if (password.length < 100) {
      setError("A senha deve ter pelo menos 100 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Chamar endpoint change-password
      await changePassword(password, accessToken);
      
      // Se der certo, usar o access_token e salvar no localStorage
      setAuthToken(accessToken);
      localStorage.setItem("twentyheim_token", accessToken);
      
      toast.success("Senha alterada com sucesso! Recarregando...");
      
      // Pequeno delay para mostrar a mensagem de sucesso
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 500);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      disableEscapeKeyDown={submitting}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#1f1f1f",
          border: "1px solid rgba(143, 188, 143, 0.3)",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8fbc8f",
            fontFamily: '"Cinzel", serif',
          }}
        >
          Alterar Senha
          {!submitting ? (
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: "#8fbc8f" }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(143, 188, 143, 0.2)",
            paddingTop: 2,
          }}
        >
          <Stack spacing={2}>
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "#ef4444", fontSize: "0.875rem" }}
              >
                {error}
              </Typography>
            )}
            <TextField
              label="Nova Senha"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              helperText={`Mínimo de 100 caracteres (${password.length}/100)`}
              error={password.length > 0 && password.length < 100}
              InputLabelProps={{ sx: { color: "#cbd5f5" } }}
              InputProps={{
                sx: {
                  color: "white",
                },
              }}
              FormHelperTextProps={{
                sx: {
                  color: password.length > 0 && password.length < 100 ? "#ef4444" : "#cbd5f5",
                },
              }}
            />
            <TextField
              label="Confirmar Nova Senha"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(null);
              }}
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={
                confirmPassword.length > 0 && password !== confirmPassword
                  ? "As senhas não coincidem"
                  : ""
              }
              InputLabelProps={{ sx: { color: "#cbd5f5" } }}
              InputProps={{
                sx: {
                  color: "white",
                },
              }}
              FormHelperTextProps={{
                sx: {
                  color: "#ef4444",
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1.5,
            padding: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || password.length < 100 || password !== confirmPassword}
            sx={{
              backgroundColor: "#166534",
              "&:hover": { backgroundColor: "#15803d" },
              "&:disabled": { backgroundColor: "#1f2937", color: "#6b7280" },
              textTransform: "none",
              fontFamily: '"Cinzel", serif',
            }}
          >
            {submitting ? "Alterando..." : "Alterar Senha"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordModal;

