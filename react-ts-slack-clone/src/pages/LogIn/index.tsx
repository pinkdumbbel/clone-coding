import React, { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '../SignUp/styles';
import inputUser from '../../hooks/inputUser';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

function LogIn() {
  const { data, revalidate } = useSWR('/api/users', fetcher);
  const [email, onChangeEmail] = inputUser('');
  const [password, onChangePassword] = inputUser('');
  const [logInError, setLogInError] = useState(false);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('login...');
    setLogInError(false);

    if (email && password) {
      const response = axios.post('/api/users/login', {
        email,
        password
      },
        {
          withCredentials: true
        }
      );

      response
        .then(() => {
          revalidate();
        })
        .catch(() => {
          setLogInError(true);
        })
    }
  }, [email, password])

  if (data === undefined) {
    return <div>...로딩중</div>
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
}

export default LogIn;