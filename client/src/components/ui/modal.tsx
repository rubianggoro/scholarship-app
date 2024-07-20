import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

const Modal = ({ open, children, title }: any) => {
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </AlertDialogHeader>
          {children}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Modal;
