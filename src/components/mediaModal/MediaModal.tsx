import React, { useState, useEffect, useRef } from 'react'
import { getAssets } from '../../services/zwAPI'

export const MediaModal = ({filter=null}:{filter:string|null}) => {
  const [assets, setAssets] = useState<any[]>([])
  const [assetsSearched, setAssetsSearched] = useState<any[]>([])
  const searchBarRef = useRef<HTMLInputElement>(null)
  const identifierRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
   (async()=>{
      const result = await getAssets(filter)
      setAssets(result.images)
      setAssetsSearched(result.images)
   })()
  }, [])

  const handleClick = (id:string|number) => {
    console.log(id)
  }
  
  const handleFilters = () => {
    if(identifierRef.current && searchBarRef.current){
      const searchBarValue = searchBarRef.current.value
      const identifierValue = identifierRef.current.value
      const filteredItems = assets.filter(asset => asset.identifier.includes(identifierValue) && asset.name.includes(searchBarValue))
      setAssetsSearched(filteredItems)
    }
  }


  return (
    <div className='absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.1)]'>  
      <div className='w-[700px] h-[400px] bg-white relative shadow-sm overflow-y-scroll'>
        
        <div className='w-full flex justify-between px-2 py-5 mb-4 bg-gray-100'>
          <input ref={searchBarRef} type="text" onChange={handleFilters} />
          <select ref={identifierRef} onChange={handleFilters}>
            <option value="">todos</option>
            <option value="hs course">hs course</option>
            <option value="muscle up course">muscle up course</option>
          </select>
        </div>

        <div className='w-full h-full flex flex-wrap justify-center gap-10'>
          { assetsSearched.length<=0 && <div>no hay coincidencias</div>}
          { assetsSearched.length>0 && assetsSearched.map(asset=>{
            const pathArr = asset.path.split("/") 
            const path = pathArr.slice(3, pathArr.length).join("/")
            return(
              <div key={"media-asset"+asset.id} onClick={()=>handleClick(asset.id)}>
                <div className='w-[150px] h-[150px] bg-center bg-no-repeat bg-cover' style={{backgroundImage:`url(https://${path})`}}></div>
                <p>{asset.name}</p>
                <p>{asset.identifier}</p>
              </div>
            )}
          )

          }
        </div>

      </div>
    </div>
  )
}