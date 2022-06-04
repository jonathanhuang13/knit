import React from 'react';

import useAuth from '@hooks/useAuth';

import AuthStack from './Authed';
import UnAuthStack from './UnAuthed';

export default function RootNavigation() {
  const { user } = useAuth();

  return user && user.email ? <AuthStack user={user} email={user.email} /> : <UnAuthStack />;
}
