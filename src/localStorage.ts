import { useState, useEffect } from "react"

export function useLocalStorage(key: string): [value: string | null, set: (value: string | null) => void] {
  const [value, set] = useState(localStorage.getItem(key))
  useEffect(() => {
    function listener() {
      set(localStorage.getItem(key))
    }
    listener()
    window.addEventListener("storage", listener)
    return () => window.removeEventListener("storage", listener)
  }, [key])
  return [value, value => localStorage.setItem(key, value)]
}
