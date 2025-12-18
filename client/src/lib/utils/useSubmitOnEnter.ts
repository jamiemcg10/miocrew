import { useEffect } from 'react'

export function useSubmitOnEnter(saveFn: Function, valid: boolean) {
  useEffect(() => {
    function submitOnEnter(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        saveFn()
      }
    }

    if (valid) {
      document.addEventListener('keypress', submitOnEnter)
    }

    return () => {
      document.removeEventListener('keypress', submitOnEnter)
    }
  }, [valid])
}
