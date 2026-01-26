import { useEffect } from 'react'

export function useSubmitOnEnter(saveFn: Function, valid: boolean) {
  useEffect(() => {
    function submitOnEnter(e: KeyboardEvent) {
      const target = e.target as HTMLElement

      if (target.tagName === 'BUTTON') {
        return
      }

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
