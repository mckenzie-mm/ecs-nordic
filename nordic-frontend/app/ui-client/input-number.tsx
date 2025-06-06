
"use client"

export default function InputNumber({ value,  color = "#282828", increment, decrement }: 
    { 
        value: number,
        color?: string,
        increment: () => void,
        decrement: () => void,
    }) {

    return (
        <div className={`input-number-wrap`}>
           <div className="down-arrow cm-font-media-play flip"  onClick={decrement} style={{color}}></div>
                <input 
                    type="number" 
                    className="input-number" 
                    value={value}
                    style={{color}}
                    onChange={() => {}} // To clear react notification
                /> 
            <div className="up-arrow cm-font-media-play" onClick={increment} style={{color}}></div>
        </div>
    );
}



  