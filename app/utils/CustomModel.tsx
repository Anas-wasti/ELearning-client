import React, { FC } from "react";
import { Modal, Box } from "@mui/material";
import { useTheme } from "next-themes";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute: (route: string) => void;
  refetch?: any;
};

const CustomModel: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  const { theme } = useTheme();
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30%] ${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        } rounded-[8px] shadow p-4 outline-none`}
      >
        <Component setRoute={setRoute} setOpen={setOpen} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
