import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

export default function ConfirmDialog(props) {
    
    const [dialogIsOpen, setIsOpen] = useState(props.dialogIsOpen); 

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
        props.onClose();
    }

    const onDialogOk = (e: MouseEvent) => {
        setIsOpen(false);
        props.delete();
        props.onClose();
    }

    return (
        <div>
            {/* <Button variant="solid" onClick={() => openDialog()}>
                Open Dialog
            </Button> */}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">대목표를 삭제하시겠습니까?</h5>
                <p>
                   
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        취소
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        삭제
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}


