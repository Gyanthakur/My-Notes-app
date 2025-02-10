import React , {useState} from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags,setTags}) => {
    const[inputValue,setInputValue] = useState("")

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            addNewTag()
        }
    }
    const addNewTag = () => {
        if(inputValue.trim() !== ""){
            setTags([...tags,inputValue.trim()])
            setInputValue("")
        }
    }
  return (
    <div>
        {tags?.length>0 && (
            <div className='flex items-center gap2 flex-wrap mt-2'>
                {tags.map((tag,index) => (
                    <span
                    key={index}
                    className='flex items-center gap-2 text-sm text-slate-900 bg-slate-300 px-3 py-1 rounded'>
                        #{tag}
                        <button onClick={()=>{
                            handleRemoveTag(tag)
                        }}>
                            <MdClose/>
                        </button>
                    </span>
                ))}
            </div>
        )}

        <div className='flex items-center gap-4 mt-3'>
            <input type='text' value={inputValue} className='text-sm bg-transparent border px-3 py-2 border-slate-800
         text-slate-800 rounded outline-none' placeholder='Add Tags...' onChange={handleInputChange}
            onKeyDown={handleKeyDown}></input>
            <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
            onClick={() => addNewTag()}>
                <MdAdd className='text-2xl text-blue-700 hover:text'></MdAdd>
            </button>
        </div>
    </div>
  )
}

export default TagInput