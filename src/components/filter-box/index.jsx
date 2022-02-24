import { useState } from "react"

export function FilterBox({ type }) {
    const [filter, setFilter] = useState({})
    function handleSubmitFilter(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log(filter)
    }
    return (
        <form onSubmit={handleSubmitFilter}>
            {type === 'bill'?
            (<div className="bills-filter-box">
                <div className="value">
                    <input
                    className="filter max-value" 
                    type="number" 
                    placeholder="Max" 
                    value = {filter.max?filter.max:''} 
                    onChange={(e) => {
                        setFilter({...filter, max: e?.target?.value})
                    }}
                    />
                    <input
                    className="filter min-value" 
                    type="number" 
                    placeholder="Min" 
                    value = {filter.min?filter.min:''} 
                    onChange={(e) => {
                        setFilter({...filter, min: e?.target?.value})
                    }}
                    />
                </div>
            </div>):
            (<>or do that for clients</>)
            }
            <button type="submit">Aplicar filtros</button>
        </form>
        
        
    )
}

