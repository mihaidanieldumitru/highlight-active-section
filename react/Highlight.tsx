import React, { useState, useLayoutEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useScrollspy } from './hooks/useScrollspy'
import MenuItem, { MenuItemSchema } from './components/MenuItem'

const CSS_HANDLES = ['highlightMenu', 'menuItem', 'menuItemActive'] as const

interface HighlightProps {
  offset?: number
  headerClassName?: string
  menuitems?: MenuItemSchema[]
}

const getHeaderHeight = (elementClass: string) => {
  const header = document.querySelector(
    `[class*=${elementClass}]`
  ) as HTMLElement | null

  return header?.offsetHeight ?? 0
}

const Highlight: StorefrontFunctionComponent<HighlightProps> = ({
  offset = 52,
  headerClassName,
  menuitems: itemsProps = [],
}) => {
  const [navigationOffset, setNavigationOffset] = useState(offset)

  useLayoutEffect(() => {
    if (headerClassName) {
      setNavigationOffset(getHeaderHeight(headerClassName))
    }
  }, [headerClassName])

  const { handles } = useCssHandles(CSS_HANDLES)

  const ids = itemsProps?.map((item) => item?.href ?? '')

  const activeId = useScrollspy(ids, navigationOffset)

  if (itemsProps.length < 1) {
    return null
  }

  return (
    <ul className={`${handles.highlightMenu} ma0 pa0 bg-base flex`}>
      {itemsProps.map((item) => {
        return (
          <MenuItem
            key={item.href}
            href={item.href}
            text={item.text}
            offset={navigationOffset}
            classes={`${handles.menuItem} ${
              item.href === activeId
                ? `${handles.menuItemActive} c-action-primary`
                : ''
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
    offset: {
      title: 'Offset',
      description: 'Height of Navigation',
      type: 'number',
    },
    headerClassName: {
      title: 'Header Class Name',
      description:
        'You can set Header Container Class Name or part of it to calculate the offset',
      type: 'string',
      default: '',
    },
    menuitems: {
      minItems: 0,
      type: 'array',
      title: 'Menu Items',
      items: {
        __editorItemTitle: {
          title: 'admin/editor.menu.item.editorItemTitle.title',
          description: 'admin/editor.menu.item.editorItemTitle.description',
          type: 'string',
        },
        text: {
          title: 'Text',
          type: 'string',
        },
        href: {
          title: 'href',
          type: 'string',
        },
        icon: {
          title: 'title',
          $ref: 'app:vtex.native-types#/definitions/url',
          default: '',
          widget: {
            'ui:widget': 'image-uploader',
          },
        },
      },
    },
  },
}

export default Highlight
