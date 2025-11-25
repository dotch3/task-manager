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
        <div className='dialog-overlay' onClick={onClose}>
            <div className='dialog' onClick={(e) => e.stopPropagation()}>
                <div className='dialog-header'>
                    <h3 className={`dialog-title ${type}`}>{title}</h3>
                    <button className='dialog-close' onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className='dialog-body'>
                    <p>{message}</p>
                </div>

                <div className='dialog-footer'>
                    {type === "confirm" ? (
                        <>
                            <button className='btn btn-secondary' onClick={onClose}>
                                {cancelText}
                            </button>
                            <button className='btn btn-danger' onClick={handleConfirm}>
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button className='btn btn-primary' onClick={onClose}>
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dialog
