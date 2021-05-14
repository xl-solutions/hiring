import React from 'react'
import { MainGridContainer } from './styles'
import { ChildrenProviderProps } from '../../@types/types'

const MainGrid = ({ children }: ChildrenProviderProps) => {
  return <MainGridContainer>{children}</MainGridContainer>
}
// Dispatch<SetStateAction<undefined>>
export default MainGrid
