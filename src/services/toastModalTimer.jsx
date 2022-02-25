export function toastModalHandler(
  closeModal,
  toastType,
  toastMessage,
  showToast,
  type,
  message
) {
  setTimeout(() => {
    closeModal(false);
    setTimeout(() => {
      toastMessage(message);
      toastType(type);
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 4000);
    }, 1000);
  }, 1000);
}
