import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components"

const HotNewReleasesGrid = styled.article`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr;
  grid-template-rows: 50px 400px 400px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 10px;

  h4{
    color: #d40d9a;
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
    max-height: 400px;
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
    max-height: 250px;
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
    max-height: 250px;
  }
`;

const NewReleasesLinks = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  color: #212529;
`

const HotNewReleases = () => {
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await axios.get('/api/hotNewReleases')
      setNewReleases(response.data)
    }

    fetchNewReleases()
  }, [])

  return (
    <HotNewReleasesGrid>
      <HotNewReleasesHeading>
        <h3>Hot new releases</h3>
      </HotNewReleasesHeading>

      <HotNewReleaseOne>
        <>
          <div>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <img src='http://localhost:3000/images/DesignerBag.png' alt='productName' />
            </NewReleasesLinks>
          </div>
          <div>
            <h4>price</h4>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <p>productName</p>
            </NewReleasesLinks>
          </div>
        </>
      </HotNewReleaseOne>
  
      <HotNewReleaseTwo>
        <>
          <div>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <img src='http://localhost:3000/images/ElegantLeatherHandbag.png' alt='productName' />
            </NewReleasesLinks>
          </div>
          <div>
            <h4>price</h4>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <p>productName</p>
            </NewReleasesLinks>
          </div>
        </>
      </HotNewReleaseTwo>

      <HotNewReleaseThree>
        <>
          <div>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <img src='http://localhost:3000/images/LeatherDesignerBag.png' alt='productName' />
            </NewReleasesLinks>
          </div>
          <div>
            <h4>price</h4>
            <NewReleasesLinks href={`/hotNewReleases/id`}>
              <p>productName</p>
            </NewReleasesLinks>
          </div>
        </>
      </HotNewReleaseThree>
      
    </HotNewReleasesGrid>
  )
}

export default HotNewReleases