import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"! (dashboard)</div>
}
