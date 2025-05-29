import { Children, ReactNode, useState } from "react"

export type TabItemData = {
  id: string

}

export type TabContainerProps = {
  children?: ReactNode
}

export function TabContainer({ children }: TabContainerProps) {
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null)

  return (
    <div className="w-full h-hull">
      {/* タブ上部のタグ表示部分 */}
      <div className="w-full h-[40px]"></div>
      {/* エディター部分 */}
      <div className="w-full h-[calc(100% - 40px)]"></div>

    </div>
  )
}

export function TabItemTag(name: string) {
  return (
    <div>
      {name}
      <button>
        {"X"}
      </button>
    </div>
  )
}

export function TabItem() {}