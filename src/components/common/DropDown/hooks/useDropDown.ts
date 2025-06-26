import { useState } from 'react';

const useDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  return { isOpen, onClickToggle, onCloseMenu };
};

export default useDropDown;
