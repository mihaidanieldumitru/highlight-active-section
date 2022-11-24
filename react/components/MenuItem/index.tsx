import React from 'react'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import './style.css'

const CSS_HANDLES = [
  'menuItemContainer',
  'menuItemContent',
  'menuItemIcon',
  'menuItemLink',
] as const

export interface MenuItemSchema {
  text?: string
  href?: string
  offset: number
  classes?: string
  icon?: string
}

const scrollTo = (targetId: string, offset: number) => {
  const element = document.getElementById(targetId)
  if (element) {
    const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: yCoordinate - offset + 1, behavior: 'smooth' })
  }
}

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = ({
  text,
  href,
  offset,
  classes,
  icon,
}: MenuItemSchema) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <li className={`${classes} list lh-title`}>
      <div className={`${handles.menuItemContainer} mh3`}>
        <Link
          className={`${handles.menuItemLink} no-underline flex items-center pa5`}
          title={text}
          onClick={(e) => {
            if (href) {
              e.preventDefault()
              scrollTo(href, offset)
            }
          }}
        >
          {icon && (
            <img
              src={icon}
              alt="Menu Icon"
              width={24}
              className={`${handles.menuItemIcon} mr2`}
            />
          )}
          <div className={`${handles.menuItemContent}`}>{text}</div>
        </Link>
      </div>
    </li>
  )
}

MenuItem.schema = {
  title: 'Menu Item',
  description: 'Menu Item',
}

export default MenuItem
