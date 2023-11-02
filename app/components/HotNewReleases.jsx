import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components"

const HotNewReleasesGrid = styled.article`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr;
  grid-template-rows: 50px 300px 300px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 10px 10px 50px;

  h4{
    color: #d40d9a;
    text-align: center;
  }

  p{
    margin: 5px 0px 10px;
  }
`;

const HotNewReleasesHeading = styled.div`
  grid-row: 1;
  grid-column: 2 /span 2;

  h3{
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }
`;

const HotNewReleaseOne = styled.div`
  grid-row: 2 / span 2;
  grid-column: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;

  img{
    max-width: 100%;
    max-height: 300px;
  }
`

const HotNewReleaseTwo = styled.div`
  grid-row: 2;
  grid-column: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;

  img{
    max-width: 100%;
    max-height: 150px;
  }
`;

const HotNewReleaseThree = styled.div`
  grid-row: 3;
  grid-column: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;

  img{
    max-width: 100%;
    max-height: 150px;
  }
`;

const NewReleasesLinks = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  color: #212529;
`

const LoadingMessage = styled.p`
  grid-column: 1 / span 4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 15px;
  margin: 0;
  min-height: 450px;
`;

const HotNewReleases = () => {
  const [newReleases, setNewReleases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await axios.get('/api/hotNewReleases')
      setNewReleases(response.data)
      setLoading(false)
    }

    fetchNewReleases()
  }, [])

  return (
    <HotNewReleasesGrid>
      <HotNewReleasesHeading>
        <h3>Hot new releases</h3>
      </HotNewReleasesHeading>

      {loading 
        ? ( <LoadingMessage>Loading...</LoadingMessage> ) 
        : newReleases 
          ? (
              <>
                <HotNewReleaseOne>
                  <div>
                    <NewReleasesLinks href={`/products/${newReleases[0]._id}`}>
                      <img src={newReleases[0].uploadedImagePaths} alt={newReleases[0].productName} />
                    </NewReleasesLinks>
                  </div>
                  <div>
                    <NewReleasesLinks href={`/products/${newReleases[0]._id}`}>
                      <p>{newReleases[0].productName}</p>
                    </NewReleasesLinks>
                    <h4>KSh {newReleases[0].price}</h4>
                  </div>
                </HotNewReleaseOne>
  
                <HotNewReleaseTwo>
                    <div>
                      <NewReleasesLinks href={`/products/${newReleases[1]._id}`}>
                        <img src={newReleases[1].uploadedImagePaths} alt={newReleases[1].productName} />
                      </NewReleasesLinks>
                    </div>
                    <div>
                      <NewReleasesLinks href={`/products/${newReleases[1]._id}`}>
                        <p>{newReleases[1].productName}</p>
                      </NewReleasesLinks>
                      <h4>KSh {newReleases[1].price}</h4>
                    </div>
                </HotNewReleaseTwo>

                <HotNewReleaseThree>
                  <div>
                    <NewReleasesLinks href={`/products/${newReleases[2]._id}`}>
                      <img src={newReleases[2].uploadedImagePaths} alt={newReleases[2].productName} />
                    </NewReleasesLinks>
                  </div>
                  <div>
                    <NewReleasesLinks href={`/products/${newReleases[2]._id}`}>
                      <p>{newReleases[2].productName}</p>
                    </NewReleasesLinks>
                    <h4>KSh {newReleases[2].price}</h4>
                  </div>
                </HotNewReleaseThree>
              </>
            )
          : ( <LoadingMessage>No hot new releases.</LoadingMessage> )
      }  
    </HotNewReleasesGrid>
  )
}

export default HotNewReleases