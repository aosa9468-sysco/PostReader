import React from 'react'

export type GetSessionStorageData<T = unknown> = [T, React.Dispatch<React.SetStateAction<T>>]
export type SaveSessionData<T = unknown> = (key: string, defaultValue: T) => GetSessionStorageData<T>

export function SaveDataInSession<T = unknown>(key: string, defaultValue: T): GetSessionStorageData<T> {
  const [value, setValue] = React.useState<T>(JSON.parse( sessionStorage.getItem(key) || JSON.stringify(defaultValue)))

  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default SaveDataInSession
