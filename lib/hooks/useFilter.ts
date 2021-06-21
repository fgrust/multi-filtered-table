import { useMemo } from 'react'

interface IProps<T> {
  data?: Array<T>
  terms?: T
}

export const useFilter = <T extends { [K in keyof T]: string }>(
  props: IProps<T>,
) => {
  const { data, terms } = props
  console.log(terms)
  const filtered = useMemo(
    () =>
      data?.filter((item) => {
        if (!terms) return true

        for (let prop in terms) {
          if (item[prop] && !!terms[prop]) {
            if (item[prop].toLowerCase().includes(terms[prop].toLowerCase()))
              continue
            else return false
          }
        }
        return true
      }),
    [data, terms],
  )

  return { filtered }
}
