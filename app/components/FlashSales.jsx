import Link from "next/link";
import styled from "styled-components"

const FlashSalesGrid = styled.article`
  display: grid;
  grid-template-columns: 2fr 3fr 3fr 3fr 2fr;
  grid-template-rows: 50px 450px;
  grid-column-gap: 10px;
  background-color: rgb(146, 212, 59);
  margin-bottom: 50px;
  padding-bottom: 25px;

  h4{
    color: #d40d9a;
  }

  img{
    max-width: 100%;
    max-height: 300px;
  }
`;

const FlashSalesTitleGrid = styled.div`
  grid-row: 1;
  grid-column: 2/ span 3;
  display: flex;
  align-items: center;

  h3{
    font-size: 1.5rem;
  }
`;

const FlashSalesProductsGridOne = styled.div`
  grid-row: 2;
  grid-column: 2;
  position: relative;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`;

const FlashSalesProductsGridTwo = styled.div`
  grid-row: 2;
  grid-column: 3;
  position: relative;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`;

const FlashSalesProductsGridThree = styled.div`
  grid-row: 2;
  grid-column: 4;
  position: relative;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`;

const FlashSalesLinks = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  color: #212529;
`

const FlashSales = () => {
  return (
    <FlashSalesGrid>
      <FlashSalesTitleGrid>
        <h3>Flash Sales</h3>
      </FlashSalesTitleGrid>

      <FlashSalesProductsGridOne>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}>
            <img src="http://localhost:3000/images/ToteBag.png" alt="" />
          </FlashSalesLinks>
        </div>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}><p>Product Name</p></FlashSalesLinks>
          <h4>Price</h4>
        </div>
      </FlashSalesProductsGridOne>

      <FlashSalesProductsGridTwo>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}>
            <img src="http://localhost:3000/images/YellowBag.png" alt="" />
          </FlashSalesLinks>
        </div>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}><p>Product Name</p></FlashSalesLinks>
          <h4>Price</h4>
        </div>
      </FlashSalesProductsGridTwo>

      <FlashSalesProductsGridThree>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}>
            <img src="http://localhost:3000/images/LeatherDesignerBag.png" alt="" />
          </FlashSalesLinks>
        </div>
        <div>
          <FlashSalesLinks href={'/flashsales/id'}><p>Product Name</p></FlashSalesLinks>
          <h4>Price</h4>
        </div>
      </FlashSalesProductsGridThree>
    </FlashSalesGrid>
  )
}

export default FlashSales