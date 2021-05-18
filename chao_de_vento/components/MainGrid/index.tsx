import React from 'react'
import { MainGridContainer } from './styles'
import { ChildrenProviderProps } from '../../@types/types'
import { motion } from 'framer-motion'

const MainGrid = ({ children }: ChildrenProviderProps) => {
  return (
    <MainGridContainer
      as={motion.section}
      transition={{ delay: 0.5, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      {children}
    </MainGridContainer>
  )
}
// Dispatch<SetStateAction<undefined>>
export default MainGrid
