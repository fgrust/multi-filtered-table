import { useMemo, useState } from 'react'
import { useFilter } from '@/lib/hooks/useFilter'
import { capitalize } from '@/lib/helper'
import { ITableHeader } from '@/@types'

interface IProps<T> {
  headerData?: Array<ITableHeader>
  data?: Array<T>
  keyExtractor?: (_: T) => any
}

const DataTable = <T extends { [K in keyof T]: string }>(props: IProps<T>) => {
  const { headerData, data, keyExtractor } = props
  const searchTerms = useMemo(() => {
    let terms: { [key: string]: string } = {}
    headerData?.forEach((item) => (terms[item.name] = ''))
    return terms
  }, [headerData])
  const [terms, setTerms] = useState(searchTerms)
  const { filtered } = useFilter({ data, terms })
  const handleChange = (e: any) => {
    if (e.currentTarget) {
      const { name, value } = e.currentTarget
      setTerms({
        ...terms,
        [name]: value,
      })
    }
  }
  const header = useMemo(
    () =>
      headerData && (
        <thead className='table-header-group'>
          <tr className='table-row'>
            {headerData.map((item) => (
              <th className='table-cell text-left pb-1' key={item.name}>
                {item.display ?? capitalize(item.name)}
              </th>
            ))}
          </tr>
        </thead>
      ),
    [headerData],
  )
  const body = useMemo(
    () =>
      filtered && (
        <tbody className='table-row-group'>
          {filtered.map((row: any) => (
            <tr key={keyExtractor?.(row)} className='table-row'>
              {headerData?.map((item) => (
                <td
                  className='table-cell pr-2'
                  key={`${item.name}-${keyExtractor?.(row)}`}
                >
                  {row[item.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ),
    [headerData, filtered],
  )
  const filter = useMemo(
    () =>
      headerData && (
        <thead className='table-footer-group'>
          <tr className='table-row'>
            {headerData.map((item) => (
              <th className='table-cell' key={item.name}>
                <input
                  type='text'
                  className='border-2 border-gray-500 focus:border-blue-300 focus:outline-none'
                  name={item.name}
                  value={terms[item.name]}
                  onChange={handleChange}
                />
              </th>
            ))}
          </tr>
        </thead>
      ),
    [headerData, terms],
  )

  return (
    <table className='table-auto'>
      {header}
      {body}
      {filter}
    </table>
  )
}

export default DataTable
