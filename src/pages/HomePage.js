import { useDatabase } from '../hooks/useDatabase'
import { initialItems } from '../model/initialItems'
import pic from '../assets/plus_sign.png'

export const HomePage = () => {
    const [state, dispatch] = useDatabase()

    /*const handleClick(param) => {

    };*/
    
  return (
      <div className="App"
          style={{
              display: 'flex',
              //justifyContent: 'space-between',
              flexWrap: 'wrap',
              flexDirection: 'column',
          }}  
      >
      <h1
        style={{
          flex: 0,
          textAlign: 'center',
          alignSelf: 'center',
          padding: 50,
          
          
        }}
      >
        Home
          </h1>

          <h2
              classname="title for items"
              style={{
                  flex: 0,
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: 'blue',
              }}
          >
              Items For Sale
          </h2>
          <ul
              style={{
                  flex: 0,
                  flexWrap: 'wrap',
                  textAlign: 'center',
                  alignSelf: 'center',
                  
                  
              } }
          >
          {state.items.map((item) => (
                  <div 
                    style={{
                      flex: 0,
                        flexWrap: "wrap",
                        display: 'inline-block',
                        margin: 20,
                        fontFamily: 'Arial Black',
                        fontSize: 18,
                        color: 'orange'
                    }}
                >
                  <h3
                      style={{
                          display: 'inline',
                          flexWrap: "wrap",
                      } }
                  >
                      {item.name}
                  </h3>
                  <button
                      img='..\assets\plus_sign.png'
                      onClick={() => handleClick(item.price)}
                      style={{
                          padding: 5
                      } }
                  >
                  </button>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                  <p>{item.stockCount}</p>
                 </div>
          ))}
              </ul>
    </div>
    )

}
