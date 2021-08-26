import React from 'react'
import SVGFunkyFranck from './SVGFunkyFrank'


const OutfitHistoryCard = (props) => {
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
      }
      
    return (
        <div className = "OutfitCard">
            <p>
            {convertDate(props.date)}
            </p>
            <div className="OutfitCardItems">
                {props.items.map(item => {
                    return <SVGFunkyFranck key = {item.type.image + item.color} url={item.type.image} color={item.color} />

                })}
            </div>
        </div>
    )
}

export default OutfitHistoryCard
