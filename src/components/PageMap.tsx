import React from 'react'

interface PageMapProps {
  anchorIds: string[]
  anchorNames: string[]
  anchorsReached: boolean[]
}
const PageMap = ({ anchorIds, anchorNames, anchorsReached }: PageMapProps) => {

  return (
    <div style={{
      width: "100%",
      boxSizing: "border-box",
      paddingLeft: "22px",
      borderRadius: "10px",
      textAlign: "left",
    }}>
      {
        anchorIds.map((id, index) => {
          return (
            <div>
              <a
                href={`#${id}`}
                style={{display: "block", textDecoration: "none", color: anchorsReached[index] ? "white" : "#c1c1c1" , fontWeight: 600}}
                onClick={(event) => {
                  event.preventDefault()
                  const height = document.getElementById("slide-height")!.getBoundingClientRect().height
                  const offset = window.pageYOffset + document.getElementById(id)!.getBoundingClientRect().top + (id !== "slide-1" ? height : 0)
                  console.log(offset)

                    window.scrollTo({
                      top: offset,
                      left: 0,
                      behavior: 'smooth'
                    })

                }}
              >{anchorNames[index]}</a>
            </div>
          )
        })
      }
    </div>
  )
}

export default PageMap