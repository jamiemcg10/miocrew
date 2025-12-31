interface DashboardSectionHeaderProps {
  title: string
}

export default function DashboardSectionHeader({ title }: DashboardSectionHeaderProps) {
  return <div className="text-lg font-bold my-2">{title}</div>
}
