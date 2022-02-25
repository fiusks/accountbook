export function toastModalHandler(closeModal, showToast) {
  setTimeout(() => {
    closeModal(false);
    setTimeout(() => {
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 4000);
    }, 1000);
  }, 1000);
}
