import React from 'react'

export default function Overview(props) {


  return (
    <div style={{display: 'flex', position: 'relative', marginTop: '30px', color: '#25383C'}} data-testid="overviewTest">
      <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', marginLeft: '120px', width: '550px'}} >
        <h3>{props.slogan}</h3>

        <p>
          {props.description}
        </p>
      </div>
      <div style={{borderLeft: '2px solid #696969', position: 'absolute', left: '700px'}}>
        <ul id='featuresList'>
          {props.features.map((feature, i) => {
            return (<li key={i}>{feature.feature}: {feature.value}</li>)
          })}

        </ul>
      </div>
    </div>
  )
}