import { Button, Modal, useMantineTheme } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import React, { FC, ReactNode } from "react";

type PropsType = {
  children?: ((close: () => void) => ReactNode) | ReactNode;
  childrenButtonIcon?: ReactNode;
  modalTitle?: string;
  buttonTitle?: string;
};

const BasicModal: FC<PropsType> = ({
  children,
  modalTitle,
  buttonTitle,
  childrenButtonIcon,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const overlay = {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2],
    opacity: 0.55,
    blur: 3,
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={modalTitle}
        overlayProps={overlay}
      >
        <hr style={{ width: "100%", padding: 0, margin: 0 }} />
        {typeof children === "function" ? children(close) : children}
      </Modal>
      {childrenButtonIcon ? (
        <span onClick={open}>{childrenButtonIcon}</span>
      ) : (
        <Button onClick={open}>{buttonTitle}</Button>
      )}
    </>
  );
};
export default React.memo(BasicModal);
