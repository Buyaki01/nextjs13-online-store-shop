import Header from "../components/Header"

const MyOrders = () => {
  return (
    <>
      <Header />
      <div className="mt-3">
        <h2 className="uppercase mb-3">Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT STATUS</th>
              <th>DELIVERY STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MyOrders