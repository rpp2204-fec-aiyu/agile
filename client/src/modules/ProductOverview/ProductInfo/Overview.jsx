import React from 'react'

export default function Overview(props) {


  return (
    <div>
      <h3>{props.slogan}</h3>

      <p>
        {props.description}
      </p>
      <ul>
        <label>--Features--
        {props.features.map((feature, i) => {
          return (<li key={i}>{feature.feature}: {feature.value}</li>)
        })}
        </label>
      </ul>
    </div>
  )
}