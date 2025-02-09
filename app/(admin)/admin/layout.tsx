import styles from './layout.module.scss'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`${styles['container']}`}>
      <div className={`${styles['sidebar']}`}>
        <Link href="/admin/eventlist">
          <div className={`${styles['tab']}`}>이벤트 관리</div>
        </Link>
      </div>

      <div className={`${styles['content']}`}>{children}</div>
    </section>
  )
}
