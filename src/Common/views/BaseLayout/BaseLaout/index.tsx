import { FC, ReactNode } from 'react';
import { FullPageContainer } from './styles';
import { AppNavigation } from '../../../components/AppNavigation';

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <FullPageContainer>
      <AppNavigation />
      {children}
    </FullPageContainer>;
};
