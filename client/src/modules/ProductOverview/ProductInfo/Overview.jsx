import React from 'react'

export default function Overview(props) {


  return (
    <div style={{display: 'flex', position: 'relative'}}>
      <div style={{marginLeft: '120px'}} >
        <h3>{props.slogan}</h3>

        <p>
          {props.description}
        </p>
      </div>
      <div style={{borderLeft: '1px solid #000000', marginRight: '150px'}}>
        <ul id='featuresList'>

          {props.features.map((feature, i) => {
            return (<li key={i}>{feature.feature}: {feature.value}</li>)
          })}

        </ul>
      </div>
    </div>
  )
}