import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogBox({
  title = "",
  open,
  setOpen,
  maxWidth = false,
  doNotClose = false,
  showClose = false,
  children,
}) {
  const handleClose = (bool) => {
    if (!bool) setOpen(false);
  };

  return (
    <div>
      <Dialog
        sx={{ minWidth: "2rem" }}
        maxWidth={maxWidth}
        open={open}
        onClose={() => handleClose(doNotClose)}
      >
        <DialogTitle>
          {showClose && (
            <div className="flex justify-between items-center">
              <div>{title}</div>
              <button
                className="shadow shadow-gray-300 px-2 rounded hover:bg-slate-300 duration-300"
                type="button"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>
          )}
          {!showClose && <>{title}</>}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
