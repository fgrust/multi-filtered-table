import DataTable from '@/components/DataTable'
import { users, headers } from '@/__mock__/users'

export default function Home() {
  return (
    <div>
      <DataTable
        headerData={headers}
        data={users}
        keyExtractor={(item) => item.id}
      />
    </div>
  )
}
