import React, { Fragment, useState } from 'react';
import { TextField, createTheme } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Box } from '@mui/material';
import styles from "./login.module.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../header';
import WomanWithHeart from "../../shared/womanWithHeart"
import { instance } from '../../../utils/axios';
import { useAppDispatch } from '../../../utils/hook';
import { login } from '../../../store/slice/auth';

const LoginPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {

      const userData = {
        email,
        password,
      }
      const user = await instance.post('auth/sign-in', userData)
      await dispatch(login(user.data))

      navigate('/')

    } catch (e) {

      return e

    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <WomanWithHeart />
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <Typography variant="h3" component={"span"} sx={{ marginBottom: 4, textAlign: 'center' }}>Вход</Typography>

          <TextField onChange={(e) => setEmail(e.target.value)} fullWidth InputProps={{ sx: { borderRadius: "1.5rem" } }} required type='email' label="Email" placeholder="Введите ваш email" />
          <TextField onChange={(e) => setPassword(e.target.value)} fullWidth InputProps={{ sx: { borderRadius: "1.5rem" } }} required type='password' label="Пароль" placeholder="Введите ваш пароль" />

          <FormControlLabel control={<Checkbox name="checkbox" />} label={<Box>Запомнить меня</Box>} />

          <Button type='submit' className={styles.button} fullWidth variant="contained">Войти</Button>
          <Link className={styles.link} to={'/register'}>Нет аккаунта? Зарегистрироваться</Link>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;