import { useDatabase } from '../hooks/useDatabase'

export const HomePage = () => {
  const [state, dispatch] = useDatabase()

  return (
    <div className="App" style={{ display: 'flex' }}>
      <h1
        style={{
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
        }}
      >
        Home
      </h1>
    </div>
  )
}
