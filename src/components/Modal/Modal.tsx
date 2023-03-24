import Portal from '../Portal/Portal'
import type { FC, ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type ModalProps = {
  children: ReactNode
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleCloseOnEscapeKey = (event: KeyboardEvent) =>
      event.key === 'Escape' ? onClose() : null
    const handleOnClickOutisde = (event: MouseEvent) =>
      event.target === ref.current ? onClose() : null

    document.body.addEventListener('keydown', handleCloseOnEscapeKey)
    document.body.addEventListener('mousedown', handleOnClickOutisde)

    return () => {
      document.body.removeEventListener('keydown', handleCloseOnEscapeKey)
      document.body.removeEventListener('mousedown', handleOnClickOutisde)

      document.body.style.overflow = ''
    }
  }, [onClose])

  document.body.style.overflow = 'hidden'

  return (
    <Portal selector="#modal">
      <div
        ref={ref}
        className="fixed top-0 right-0 left-0 bottom-0 flex h-screen w-screen items-center justify-center backdrop-blur-md "
      >
        {children}
      </div>
    </Portal>
  )
}

export default Modal
