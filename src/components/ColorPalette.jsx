import React from 'react'

const ColorPalette = (props) => {
    return (
        <div className = "center flex">
            {props.colors.map(color => {
                return <div key ="color" className = "ColorPalette" style={{
                    backgroundColor: color,
                }}>
                </div>
            })}
        </div>
    )
}

export default ColorPalette
