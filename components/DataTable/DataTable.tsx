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
        <thead>
          <tr>
            {headerData.map((item) => (
              <th key={item.name}>{item.display ?? capitalize(item.name)}</th>
            ))}
          </tr>
        </thead>
      ),
    [headerData],
  )
  const body = useMemo(
    () =>
      filtered && (
        <tbody>
          {filtered.map((row: any) => (
            <tr key={keyExtractor?.(row)}>
              {headerData?.map((item) => (
                <td key={`${item.name}-${keyExtractor?.(row)}`}>
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
        <thead>
          <tr>
            {headerData.map((item) => (
              <th key={item.name}>
                <input
                  type='text'
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
