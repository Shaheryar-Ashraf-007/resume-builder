import React from 'react';

const Modal = ({
    children,
    isOpen,
    onClose,
    title,
    hideHeader,
    showActionButton,
    actionBtnIcon = null,
    actionBtnText,
    onActionClick,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                {!hideHeader && (
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">{title} shaheryar</h2>
                        <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                )}
                <div className="modal-body mb-4">
                    {children}
                </div>
                {showActionButton && (
                    <div className="flex justify-end">
                        <button 
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition" 
                            onClick={onActionClick}
                        >
                            {actionBtnIcon && <img src={actionBtnIcon} alt="" className="inline-block mr-1" />} 
                            {actionBtnText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;