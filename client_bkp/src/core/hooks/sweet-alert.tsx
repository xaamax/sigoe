import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);

const openNotificationError = (mensage: string) => {
  swal.fire({
    icon: "error",
    title: "Erro",
    text: mensage,
    confirmButtonText: "Fechar",
  });
};

const openNotificationErrors = (mensagens: string[]) => {
  if (mensagens?.length) {
    mensagens.forEach((description) => {
      swal.fire({
        icon: "error",
        title: "Erro",
        text: description,
      });
    });
  }
};

const openNotificationSuccess = (title: string, text?: string) => {
  swal.fire({
    icon: "success",
    title,
    text,
    position: "top-end",
    timer: 1500,
    showConfirmButton: false,
  });
};

const openNotificationWarning = (message: string, description?: string) => {
  swal.fire({
    icon: "warning",
    title: message,
    text: description,
  });
};

const openNotificationConfirm = (
  title: string,
  onConfirm: () => void,
  html?: string,
) => {
  swal
    .fire({
      icon: "warning",
      title,
      html,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    })
    .then((result) => result.isConfirmed && onConfirm());
};

export {
  openNotificationError,
  openNotificationErrors,
  openNotificationSuccess,
  openNotificationWarning,
  openNotificationConfirm,
};
