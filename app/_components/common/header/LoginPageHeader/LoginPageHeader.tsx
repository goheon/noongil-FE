import styles from './LoginPageHeader.module.scss'

// 마이페이지 헤더
const LoginHeader = () => {
  return (
    <div className={`${styles['header_login']}`}>
      <h1 className={`${styles['heading']}`}>로그인</h1>
    </div>
  )
}

export { LoginHeader }
