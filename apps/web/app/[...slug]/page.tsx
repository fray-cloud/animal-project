import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: ['like'] }];
}

export default function Page() {
  return <ClientOnly />;
}
