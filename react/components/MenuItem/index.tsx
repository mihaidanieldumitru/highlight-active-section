import React from 'react'
import { Link } from 'vtex.render-runtime'

export interface MenuItemSchema {
  text?: string
  href?: string
  classes?: string
}

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = ({
  text,
  href,
  classes,
}: MenuItemSchema) => {
  return (
    <li className={classes}>
      <Link to={`#${href}`}>{text}</Link>
    </li>
  )
}

MenuItem.schema = {
  title: 'Menu Item',
  description: 'Menu Item',
}

export default MenuItem
