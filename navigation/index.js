import React from 'react';
import { useAuthentication } from '../src/utils/hooks/useAuthentication';

import UserStack from './serStack';
import AuthStack from './authStack';

export default function RootNavigation() {
	const { user } = useAuthentication();

	return user ? <UserStack /> : <AuthStack />;
}
