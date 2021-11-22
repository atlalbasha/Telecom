import React, { createContext, useState } from 'react'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [colors, setColors] = useState([0.1, 0.2, 0.3, 0.4, 0.5, 0.9])
  return (
    <DataContext.Provider
      value={{ data: [data, setData], colors: [colors, setColors] }}
    >
      {children}
    </DataContext.Provider>
  )
}
