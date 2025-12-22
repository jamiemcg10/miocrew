export class LocalStorage {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static get<T>(key: string): T | null {
    if (typeof window == 'undefined') return null

    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  static clear() {
    localStorage.clear()
  }
}
