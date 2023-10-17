import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"

const HotNewReleasesGrid = styled.article`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr;
  grid-template-rows: 50px 500px 450px;
  grid-column-gap: 10px;
`;

const HotNewReleases = () => {
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await axios.get('/api/hotNewReleases')
      setNewReleases(response.data.hotNewReleaseProducts)
    }

    fetchNewReleases()
  }, [])

  return (
    <HotNewReleasesGrid>
      {newReleases.length > 0 && newReleases.map(product => (
        <div>
          {product.productName}
        </div>
      ))}
    </HotNewReleasesGrid>
  )
}

export default HotNewReleases