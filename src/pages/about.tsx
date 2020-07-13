import React from 'react'
import { css } from '@emotion/core'
import { AnimatePresence, motion } from 'framer-motion'
import chroma from 'chroma-js'

// Components
import { SearchDashboardDesktop } from '../components'

// Styles
import { colors, space, fontSize } from '../styles/variables'

const IndexPage = () => {
  const [isLinkHovered, setIsLinkHovered] = React.useState(false)

  return (
    <SearchDashboardDesktop>
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            height: 80%;
            background: ${colors.bgColorPrimary};
            color: ${colors.textColorPrimary};
            width: 800px;
            transform: translateY(${space[7]}px);
            border-radius: ${space[1]}px;
            display: grid;
            grid-template-columns: repeat(3, 50%);
            grid-column-gap: ${space[14]}px;
            font-size: ${fontSize.lg};
            color: ${colors.textColorPrimary};
            letter-spacing: 0.8px;
            line-height: 1.4;
            user-select: none;
          `}
        >
          <div>
            <p>
              First of all, I would like to thank you for visiting this site and I really hope you found what you were looking for! This
              project itself is a continuous work in progress, with new features added as soon as time allows it, so please come back to
              check for updates! Also, in case you think you have some good ideas about how to improve this tool, or if you encountered some
              problems while using it, please do feel free to reach out to me directly via{' '}
              <span
                css={css`
                  position: relative;
                `}
              >
                <motion.div
                  css={css`
                    padding: 0px ${space[2]}px 3px ${space[2]}px;
                    position: absolute;
                    overflow: hidden;
                    background-color: #1da1f2;
                    border-radius: 2px;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    left: 8px;
                    top: 3px;
                    line-height: 1.2;
                  `}
                  initial={{ width: 75 }}
                  animate={{ width: isLinkHovered ? 150 : 75 }}
                >
                  <a
                    css={css`
                      text-decoration: none;
                      color: #fff;
                    `}
                    href="https://twitter.com/AndSzesztai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() => setIsLinkHovered(true)}
                    onFocus={() => setIsLinkHovered(true)}
                    onMouseLeave={() => setIsLinkHovered(false)}
                  >
                    twitter
                  </a>
                  <AnimatePresence>
                    {isLinkHovered && (
                      <motion.span
                        css={css`
                          position: absolute;
                          left: 75px;
                        `}
                        initial={{
                          opacity: 0
                        }}
                        animate={{
                          opacity: 1
                        }}
                        exit={{
                          opacity: 0
                        }}
                      >
                        let's go!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </span>
            </p>
            <p>
              Second, I huge thank you goes out to the platform that collected, managed and provided the data used in all the charts and
              cards,{' '}
              <a
                css={css`
                  color: ${colors.accentSecondary};
                `}
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Movie Database (TMDb)
              </a>
              .
            </p>
          </div>
          <div>
            <p>And of course this project has been helped with many great ideas from a few amazing people: </p>
          </div>
        </div>
      </div>
    </SearchDashboardDesktop>
  )
}

export default IndexPage
