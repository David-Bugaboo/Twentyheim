import React, { useEffect, useState } from "react";
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
import { useAuth } from "../context/AuthContext";

export type AuthMode = "login" | "register";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
}

const defaultFormState = {
  name: "",
  email: "",
  password: "",
};

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode,
  onClose,
  onSwitchMode,
}) => {
  const { login, register } = useAuth();
  const [formState, setFormState] = useState(defaultFormState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormState(defaultFormState);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    setSubmitting(false);
  }, [mode]);

  const getErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
      const data = error.response?.data as
        | { message?: string; error?: string }
        | undefined;
      return (
        data?.message ||
        data?.error ||
        error.response?.statusText ||
        "Falha ao realizar a operação."
      );
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Falha ao realizar a operação.";
  };

  const handleChange =
    (field: "name" | "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      if (mode === "login") {
        await login({
          email: formState.email.trim(),
          password: formState.password,
        });
        toast.success("Login realizado com sucesso!");
        onClose();
      } else {
        const user = await register({
          name: formState.name.trim(),
          email: formState.email.trim(),
          password: formState.password,
        });
        toast.success(
          `Conta criada para ${user.name}. Agora faça login para continuar.`
        );
        setFormState((prev) => ({
          ...prev,
          password: "",
        }));
        onSwitchMode("login");
      }
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchMode = () => {
    onSwitchMode(mode === "login" ? "register" : "login");
  };

  const title = mode === "login" ? "Entrar" : "Criar conta";
  const submitLabel = mode === "login" ? "Entrar" : "Registrar";
  const switchMessage =
    mode === "login"
      ? "Ainda não tem uma conta?"
      : "Já possui uma conta?";
  const switchAction =
    mode === "login" ? "Criar conta" : "Entrar";

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
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
          {title}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "#8fbc8f" }}
            disabled={submitting}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(143, 188, 143, 0.2)",
            paddingTop: 2,
          }}
        >
          <Stack spacing={2}>
            {mode === "register" && (
              <TextField
                label="Nome"
                fullWidth
                required
                value={formState.name}
                onChange={handleChange("name")}
                InputLabelProps={{ sx: { color: "#cbd5f5" } }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
              />
            )}
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              required
              value={formState.email}
              onChange={handleChange("email")}
              InputLabelProps={{ sx: { color: "#cbd5f5" } }}
              InputProps={{
                sx: {
                  color: "white",
                },
              }}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              required
              value={formState.password}
              onChange={handleChange("password")}
              InputLabelProps={{ sx: { color: "#cbd5f5" } }}
              InputProps={{
                sx: {
                  color: "white",
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
            disabled={submitting}
            sx={{
              backgroundColor: "#166534",
              "&:hover": { backgroundColor: "#15803d" },
              textTransform: "none",
              fontFamily: '"Cinzel", serif',
            }}
          >
            {submitting ? "Enviando..." : submitLabel}
          </Button>
          <Typography
            variant="body2"
            sx={{ color: "#cbd5f5", textAlign: "center" }}
          >
            {switchMessage}{" "}
            <Button
              type="button"
              onClick={handleSwitchMode}
              sx={{
                color: "#86efac",
                textTransform: "none",
                fontWeight: 600,
                fontFamily: '"Crimson Text", serif',
              }}
              disabled={submitting}
            >
              {switchAction}
            </Button>
          </Typography>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthModal;
