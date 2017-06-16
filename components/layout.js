// @flow
import React from 'react'
import type { Children } from 'react'
import classnames from 'classnames'

import Nav from './nav'
import Chap from './chap'

type NavItem = Object & {
  [key: string]: string
}

type Author = {
  url?: string,
  name?: string
}

type Repository = {
  url?: string
}

type Pkg = {
  name: string,
  homepage?: string,
  author?: Author,
  repository?: Repository
}

type Props = {
  children?: Children,
  title: string,
  className?: string,
  toc: NavItem,
  pkg: Pkg,
  root: string
}

export default ({
  children,
  title = '',
  className,
  toc = {},
  pkg,
  root = ''
  }: Props) => {
  return (
    <div className={className}>

      <header className="site-header">
        <h1><a href={pkg.homepage}>{pkg.name}</a></h1>
        <Nav {...pkg} />
      </header>

      <section className="main">
        <aside>
          {Object.keys(toc).map((key: string, i: number) => {
            let nav: NavItem = toc[key]
            return (
              <Chap title={key === '.' ? '' : key} key={i}>
                {Object.keys(nav).map((label: string) =>
                  <li
                    key={label}
                    className={classnames({ active: title === label })}
                  >
                    <a
                      href={`${root}${nav[label].replace(
                        /\.md/g,
                        ''
                      )}/index.html`}
                    >
                      {label}
                    </a>
                  </li>
                )}
              </Chap>
            )
          })}
        </aside>
        <article>
          {children}
        </article>
      </section>

      {pkg.author
        ? <footer>
            © 2017 <a href={pkg.author.url}>{pkg.author.name || pkg.name}</a>
            . All rights reserved.
        </footer>
        : null}
    </div>
  )
}
