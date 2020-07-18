export const transition = {
  primary: {
    type: 'spring',
    damping: 12,
    stiffness: 130
  },
  whileHover: {
    type: 'spring',
    damping: 12,
    stiffness: 200
  }
}

export const whileHover = {
  scale: 1.25
}

export const opacityVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

export const animateProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit'
}

export const duration = {
  xs: 150,
  sm: 300,
  md: 500,
  lg: 1000
}

export const delay = {
  xs: 0.4,
  sm: 0.6,
  md: 0.8
}
