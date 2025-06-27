import useClickOutside from '@/hooks/useClickOutside';

import DropDownMenu from './DropDownMenu';
import DropDownTrigger from './DropDownTrigger';

type DropDownProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const DropDown = ({ onClose, children }: DropDownProps) => {
  const dropDownRef = useClickOutside(onClose);

  return (
    <div ref={dropDownRef} className="relative inline-block">
      {children}
    </div>
  );
};

DropDown.Menu = DropDownMenu;
DropDown.Trigger = DropDownTrigger;

export default DropDown;
