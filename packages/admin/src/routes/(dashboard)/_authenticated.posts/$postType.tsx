import { postQueries } from '@/lib/queries/post'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(dashboard)/_authenticated/posts/$postType',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { postType } = Route.useParams()
  const { data: posts } = useQuery(postQueries.byType(postType));
  console.log('### posts', posts);

  return <div>Hello "/(dashboard)/posts/{postType}"!</div>
}
