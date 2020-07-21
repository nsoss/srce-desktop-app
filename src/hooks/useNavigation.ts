import { useContext } from 'react';
import NavigationContext from '../contexts/NavigationContext';

export default function useNavigation() {
  return useContext(NavigationContext);
}
