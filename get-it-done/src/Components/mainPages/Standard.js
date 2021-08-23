import React from "react";

export default function Standard({standard, setStandard}) {
  if(standard[0]){
    console.log(standard.length + "     " + standard[0].task)
  }
  return ( 
    <div>

{ standard[0] ? <h1> 
{standard[0].task} 
</h1>
: null}
    </div>

    );
}
