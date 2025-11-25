import { X } from "lucide-react"
import { useEffect } from "react"

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    message: string
    type?: "confirm" | "alert" | "error"
    onConfirm?: () => void
    confirmText?: string
    cancelText?: string
}

const Dialog = ({
    isOpen,
    onClose,
    title,
    message,
    type = "alert",
    onConfirm,
    confirmText = "OK",
    cancelText = "Cancel",
}: DialogProps) => {
    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm()
        }
        onClose()
    }

    return (
        <div className='dialog-overlay' onClick={onClose} data-id='dialogOverlay'>
            <div className='dialog' onClick={(e) => e.stopPropagation()} data-id={`dialog-${type}`}>
                <div className='dialog-header' data-id='dialogHeader'>
                    <h3 className={`dialog-title ${type}`} data-id='dialogTitle'>
                        {title}
                    </h3>
                    <button className='dialog-close' onClick={onClose} data-id='dialogCloseBtn' title='Close dialog'>
                        <X size={20} />
                    </button>
                </div>

                <div className='dialog-body' data-id='dialogBody'>
                    <p data-id='dialogMessage'>{message}</p>
                </div>

                <div className='dialog-footer' data-id='dialogFooter'>
                    {type === "confirm" ? (
                        <>
                            <button
                                className='btn btn-secondary'
                                onClick={onClose}
                                data-id='dialogCancelBtn'
                                title='Cancel'
                            >
                                {cancelText}
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={handleConfirm}
                                data-id='dialogConfirmBtn'
                                title='Confirm action'
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button className='btn btn-primary' onClick={onClose} data-id='dialogOkBtn' title='OK'>
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dialog
