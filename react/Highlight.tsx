import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useScrollspy } from './hooks/useScrollspy'
import MenuItem, { MenuItemSchema } from './components/MenuItem'

const CSS_HANDLES = ['highlightMenu', 'menuItem', 'menuItemActive'] as const

interface HighlightProps {
  menuitems?: MenuItemSchema[]
}

const Highlight: StorefrontFunctionComponent<HighlightProps> = ({
  menuitems: itemsProps = [],
}) => {
  if (itemsProps.length < 1) {
    return null
  }

  const { handles } = useCssHandles(CSS_HANDLES)

  const ids = itemsProps?.map((item) => item?.href ?? '')

  const activeId = useScrollspy(ids, 54)

  return (
    <ul className={`${handles.highlightMenu} ma0 pa0`}>
      {itemsProps.map((item) => {
        return (
          <MenuItem
            key={item.href}
            href={item.href}
            text={item.text}
            classes={`${handles.menuItem} ${
              item.href === activeId ? handles.menuItemActive : ''
            }`}
          />
        )
      })}
    </ul>
  )
}

Highlight.schema = {
  title: 'Highlight Section',
  description: 'Highlight Section',
  type: 'object',
  properties: {
    menuitems: {
      minItems: 0,
      type: 'array',
      title: 'Menu Items',
    },
  },
}

export default Highlight
