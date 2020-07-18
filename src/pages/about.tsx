import React from 'react'
import { css } from '@emotion/core'
import { AnimatePresence, motion } from 'framer-motion'
import { useTimeoutFn } from 'react-use'

// Components
import { SearchDashboardDesktop } from '../components'
import { FavoriteHeart } from '../components/atoms'

// Styles
import { colors, space, fontSize, circleFillOpacity } from '../styles/variables'
import { duration } from '../styles/animation'

const IndexPage = () => {
  const [isLinkHovered, setIsLinkHovered] = React.useState(false)
  const [isHeartHovered, setIsHeartHovered] = React.useState(false)
  const [isFavorited, setIsFavorited] = React.useState(false)
  useTimeoutFn(() => {
    setIsFavorited(true)
    setIsHeartHovered(true)
  }, duration.md)

  return (
    <SearchDashboardDesktop>
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            pointer-events: none;
            font-size: 16rem;
            line-height: 0.9;
            font-weight: 500;
            text-transform: uppercase;
            color: ${colors.bgColorPrimaryLight};
            position: absolute;
            left: ${space[4]}px;
            top: ${space[4]}px;
            opacity: ${circleFillOpacity};
          `}
        >
          Thank you
        </div>
        <div
          css={css`
            height: 90%;
            color: ${colors.textColorPrimary};
            padding: 0 ${space[8]}px;
            width: 950px;
            transform: translateY(${space[7]}px);
            border-radius: ${space[1]}px;
            font-size: ${fontSize.lg};
            color: ${colors.textColorPrimary};
            letter-spacing: 0.8px;
            line-height: 1.4;
            user-select: none;

            overflow-y: auto;

            scrollbar-width: thin;
            scrollbar-color: rebeccapurple green;

            ::-webkit-scrollbar {
              width: ${space[1]}px;
            }

            ::-webkit-scrollbar-track {
              background: ${colors.bgColorPrimaryLight};
              border-radius: ${space[1]}px;
            }

            ::-webkit-scrollbar-thumb {
              background: ${colors.accentSecondary};
              border-radius: ${space[1]}px;
            }

            display: grid;
            grid-template-rows: repeat(3, auto);
            grid-template-columns: 1fr;
            grid-column-gap: 0px;

            @media (min-width: 1000px) {
              grid-template-columns: repeat(2, auto);
              grid-column-gap: ${space[14]}px;
            }
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
                <motion.span
                  css={css`
                    padding: 0px ${space[2]}px 3px ${space[2]}px;
                    position: absolute;
                    overflow: hidden;
                    background-color: ${colors.accentSecondary};
                    border-radius: 2px;
                    color: ${colors.textColorSecondary};
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
                      color: ${colors.textColorSecondary};
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
                </motion.span>
              </span>
            </p>
            <p>
              Second, I huge thank you goes out to the platform that collected, managed and provided the data used in all the charts and
              cards,{' '}
              <a
                css={css`
                  color: ${colors.accentSecondary};
                  text-decoration: none;
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
            <p>
              And of course this project has been helped with many great ideas from a few amazing people. Thank you so much!{' '}
              <span role="img" aria-label="clapping hands emoji">
                👏
              </span>
            </p>
            <div>
              <a
                css={css`
                  color: ${colors.accentSecondary};
                  text-decoration: none;
                `}
                href="https://www.linkedin.com/in/alicedemauro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alice De Mauro
              </a>
              :
              <p>
                Ideas and suggestions on general design, colors, themes and layout, usability improvements, as well as features like
                bookmarking and the adding of the customizable "My Bookmarks" dashboard. Recommendations on code structure and best
                practices.
              </p>
            </div>
            <div>
              <a
                css={css`
                  color: ${colors.accentSecondary};
                  text-decoration: none;
                `}
                href="https://twitter.com/ZaksViz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zak Geis
              </a>
              :<p>The idea of genre filtering options with items in movie details cards and the main filter bar.</p>
            </div>
            <p
              onMouseOver={() => setIsHeartHovered(true)}
              onMouseOut={() => setIsHeartHovered(false)}
              onFocus={() => setIsHeartHovered(true)}
              onBlur={() => setIsHeartHovered(false)}
            >
              This tool is being built with{' '}
              <span
                css={css`
                  position: relative;
                `}
              >
                <span
                  css={css`
                    position: absolute;
                    top: -8px;
                    left: 20px;
                  `}
                >
                  <FavoriteHeart isFavorited={isFavorited} isHovered={isHeartHovered} />
                </span>
              </span>{' '}
              by ‎‏‏‎ ‎ ‎ ‎ ‎ ‎
              <a
                css={css`
                  color: ${colors.accentSecondary};
                  text-decoration: none;
                `}
                href="https://www.linkedin.com/in/andr%C3%A1s-szesztai-351a4379/"
                target="_blank"
                rel="noopener noreferrer"
              >
                András Szesztai
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </SearchDashboardDesktop>
  )
}

export default IndexPage
