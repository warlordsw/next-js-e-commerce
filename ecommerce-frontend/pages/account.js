import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { API_URL } from '../utils/urls'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const token = await getToken()
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              //prettier-ignore
              'Authorization': `Bearer ${token}`,
            },
          })
          const data = await order_res.json()
          setOrders(data)
        } catch (err) {
          setOrders([])
        }
      }
    }
    fetchOrders()
  }, [user])
  return orders
}

export default function Account() {
  const { user, logoutUser, getToken } = useContext(AuthContext)

  const orders = useOrders(user, getToken)

  console.log('Account.render orders', orders)

  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <Link href='/'>
          <a>Go back</a>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Account page</title>
        <meta
          name='description'
          content='The account page, view your orders and logout'
        />
      </Head>

      <h2>Account page</h2>
      <p>Logged in ass : {user.email}</p>
      <a href='#' onClick={logoutUser}>
        Logout
      </a>
    </div>
  )
}
