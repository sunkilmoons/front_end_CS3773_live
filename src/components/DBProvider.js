import { DBContext, useDBReducer } from '../hooks/useDatabase'

export const DBProvider = ({ children }) => {
  const [state, dispatch] = useDBReducer()

  return (
    <DBContext.Provider value={{ state, dispatch }}>
      {children}
    </DBContext.Provider>
  )
}
