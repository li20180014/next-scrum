import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
  selector: string
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [selector])

  return mounted
    ? createPortal(children, document.querySelector(selector)!)
    : null
}

export default Portal
