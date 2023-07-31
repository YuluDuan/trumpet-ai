import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineChevronDown } from "react-icons/hi";

interface DropdownMenuProps {
  selectedLabel: string;
  menuItems: string[];
  hasSubDropdown: boolean;
}

const DropdownMenuUI = ({
  selectedLabel,
  menuItems,
  hasSubDropdown,
}: DropdownMenuProps) => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="dropdown-btn" aria-label="dropdown button">
            {selectedLabel}
            <HiOutlineChevronDown />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Label />
            <DropdownMenu.Item />

            <DropdownMenu.Group>
              <DropdownMenu.Item />
            </DropdownMenu.Group>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger />
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent />
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuUI;
