import styles from '@/components/user/userName/UserName.module.scss'
export default function UserName({userName}: {userName: string}){
  return(
    <div className={styles.container}>
      <p className={styles.text}>{userName}</p>
    </div>
  )
}