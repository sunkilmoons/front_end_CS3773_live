import { useCallback, useEffect } from 'react'
import { useDatabase } from './useDatabase'

/**
 * This function will login the test user if they are not already logged in.
 * For use until the account page is setup.
 */
export const useLoginWithTestUser = () => {
  const [state, dispatch] = useDatabase()

  const memoizedDispatch = useCallback(
    (...args) => dispatch(...args),
    [dispatch]
  )

  useEffect(() => {
    if (!state.loggedInUser) {
      memoizedDispatch({
        type: 'login',
        payload: { username: 'test_user', password: 'password' },
      })
    }
  }, [state.loggedInUser, memoizedDispatch])
}
