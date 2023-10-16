import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'flowbite-react'
import { AiFillDelete } from 'react-icons/ai'

import {
  addCategory,
  removeCategory,
  setMaxPrice,
  setMinPrice
} from '../redux/Slices/FilterSlice' 
const Filter = () => {
  // eslint-disable-next-line 
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useSelector(state => state.items)
  const { categories, minPrice, maxPrice } = useSelector(state => state.filter)
  const [categoryList, setCategoryList] = useState([])
  const newList = new Set(categoryList)
  const dropdownClass = `relative group ${isOpen ? 'z-10' : ''}`
  const dispatch = useDispatch()

  useEffect(() => {
    data.forEach(item => {
      if (!categoryList.includes(item.category)) {
        setCategoryList(prevList => [...prevList, item.category])
      }
    })
  }, [])

  const handleCategoryToggle = category => {
    if (categories.includes(category)) {
      dispatch(removeCategory(category))
    } else {
      dispatch(addCategory(category))
    }
  }

  const clearCategory = () => {
    categories.forEach(item => {
      dispatch(removeCategory(item))
    })
  }

  return (
    <div className='filter flex flex-col gap-6 pt-7 lg:ml-0 2xl:ml-0 md:ml-0 sm:ml-[20%]'>
      <div className='flex flex-row items-center gap-2'>
        <Dropdown
          className='bg-white hover:scale-110'
          dismissOnClick={false}
          label='Categories'
        >
          <ul
            className={`absolute mt-5 ${dropdownClass} overflow-y-scroll h-15`}
          >
            {[...newList].map((category, index) => (
              <li key={index} className='z-30 text-sm bg-white shadow-md'>
                <label className='flex items-center justify-between px-4 py-2 bg-transparent cursor-pointer'>
                  <div className='flex gap-2'>
                    <span>{category}</span>
                    <input
                      type='checkbox'
                      name='category'
                      value={category}
                      checked={categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className='w-5 h-5 border border-gray-300 rounded appearance-none checked:bg-blue-500 checked:border-transparent'
                    />
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </Dropdown>
        {categories.length > 0 ? (
          <AiFillDelete
            onClick={clearCategory}
            className='text-[1.5rem] hover:text-red-500 trasition duration-200'
            title='Clear all categories'
          />
        ) : (
          <></>
        )}
      </div>
      
        <div className='flex flex-row gap-2 '>
       
          <div className='flex flex-col '>
            <label htmlFor='minPrice' className='text-sm text-gray-600'>
              Min Price
            </label>
            <input
              type='number'
              id='minPrice'
              placeholder='minimum price'
              value={minPrice}
              onChange={e => dispatch(setMinPrice(e.target.value))}
              className='p-2 border rounded w-[5rem]'
              defaultValue={0}
            />
          </div>
          <div className='flex flex-col '>
            <label htmlFor='maxPrice' className='text-sm text-gray-600'>
              Max Price
            </label>
            <input
              type='number'
              id='maxPrice'
              placeholder='maximum price'
              value={maxPrice}
              onChange={e => dispatch(setMaxPrice(e.target.value))}
              className='p-2 border rounded w-[5rem]'
              defaultValue={100}
            />
          </div>
        </div>
    </div>
  )
}

export default Filter
