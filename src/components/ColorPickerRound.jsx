import React from 'react'

const ColorPickerRound = (props) => {
    const style = { backgroundColor: props.color };

    if(props.items){
        // console.log(props.items)
        const colorsSelectedForItem = props.items.filter((item) => item.typeId === props.typeIdClicked).map((item) => item.color)
        
        if(colorsSelectedForItem.includes(props.color) )
        {
            style.border = "5px inset violet"
            style.borderImage = "linear-gradient(to left, #00C853, #B2FF59)"

        } 
    }

    return (
        <div
            onClick={() => props.handleClick(props.color)}
            className="ColorPickerRound"
            style={ style}>
        </div>
    )
}

export default ColorPickerRound
