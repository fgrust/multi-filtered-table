import DataTable from '@/components/DataTable'
import { users, headers } from '@/__mock__/users'

export default function Home() {
  return (
    <div className="flex justify-center">
      <DataTable
        headerData={headers}
        data={users}
        keyExtractor={(item) => item.id}
      />
    </div>
  )
}
