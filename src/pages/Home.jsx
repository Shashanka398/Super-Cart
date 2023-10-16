import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../components/Filter'
import { fetchItems } from '../redux/Slices/ApiDataSlice'
import { setMinPrice, setMaxPrice } from '../redux/Slices/FilterSlice'

const Home = () => {
  const dispatch = useDispatch()
  const filterCategory = useSelector(state => state.filter)
  const minPrice = filterCategory.minPrice
  const maxPrice = filterCategory.maxPrice
  const { data, loading, loaded } = useSelector(state => state.items)
  const filterData = data.filter(post =>
    filterCategory.categories.includes(post.category)
  )
  useEffect(() => {
    dispatch(setMinPrice(0))
    dispatch(setMaxPrice(10000))
  }, [])
  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch, filterCategory, minPrice, maxPrice])
  console.log('kk', filterData)

  return (
    <div className='flex justify-start h-full p-2 home sm:flex-col xs:flex-col lg:flex-row md:flex-row 2xl:flex-row'>
      <Filter />
      {loading ? (
        <div className='mt-[25%] ml-[70%]'>
          <Spinner />
        </div>
      ) : data.length > 0 ? (
        filterData.length > 0 ? (
          <div className='grid xs:grid-cols-1 h-[100vh] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  p-2 mx-auto space-y-10  overflow-auto scrollbar-none scrollbar-thumb-black scrollbar-track-gray-100 '>
            {filterData.map(post =>
              post.price >= minPrice && post.price <= maxPrice ? (
                <Product key={post.id} post={post} />
              ) : (
                <></>
              )
            )}
          </div>
        ) : (
          <div className='grid xs:grid-cols-1 sm:grid-cols-1 h-[100vh] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 mx-auto space-y-10   overflow-auto scrollbar-none scrollbar-thumb-black scrollbar-track-gray-100'>
            {data.map(post =>
              post.price >= minPrice && post.price <= maxPrice ? (
                <Product key={post.id} post={post} />
              ) : (
                <></>
              )
            )}
          </div>
        )
      ) : (
        <div flex justify-center items-center>
          {' '}
          No data found{' '}
        </div>
      )}
    </div>
  )
}

export default Home
