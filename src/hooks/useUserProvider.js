import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);

  return { openModal, setOpenModal, openEditMenu, setOpenEditMenu };
}

export default useUserProvider;
