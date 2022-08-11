// scale textbox

let x = parcel.getFeatureById('[enter_ID]')
feature.on('click',e=>{
   x.scale.set(1.13,0.5,1)
  setTimeout(()=>{ 
  x.scale.set(0.01,0.01,0.01)
},5000)
})

// token gate

feature.on('click',e=>{
let mfer = e.player.wallet
let url = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xFf8b31bAA28a638AFf795FE36E73200303157b7c&address='  + mfer + '&tag=latest&apikey=DKZA18WTG7ZCPMRJ52K74HQTNIISQ4AE6B'
fetch(url)
  .then(r => r.json())
  .then( r=> {
   if (r.result > 0)    {
     e.player.teleportTo('E@73E,445S,1F')
    } else {
    }
  })
})


//Makes an object grabbable v1.1 - Fayelure

let Distance_to_player= .3 // How far the object is relative to the player (negative will be behind)
let up_down_constant= -0.5  // Positive object will go higher, negative will go lower. eg: -0.65 places the object where your hands are, approximately. 0 will place the object right above your eyes.
let refresh_rate = 50       // Number of milliseconds. Please avoid a refresh rate < 30 as it could crash the grid.

let clone = true; // change this to false if you want to not clone the object.

//-------------- Do not touch ---------------------------

function moveObject(object,player){ // calculates new position of object

  let spherePos = object.position;
  let playerRotation = player.rotation;

  let xDelta = Distance_to_player*Math.cos(-playerRotation.y+Math.PI/2 + Math.PI);
  let yDelta = Distance_to_player*Math.tan(playerRotation.x);
  let zDelta = Distance_to_player*Math.sin(-playerRotation.y+Math.PI/2 + Math.PI);

      var positionRell = [
    player.position.x - xDelta,
    player.position.y - yDelta +(up_down_constant),
    player.position.z - zDelta
  ];

return positionRell
}

function setPosition(newobject,e){ // refreshes the positions
    newobject.set({position:moveObject(newobject,e.player)})
  if(!newobject.position || !newobject.rotation){
    parcel.removeFeature(newobject)
  }else{
  setTimeout(()=>{
    setPosition(newobject,e)
  },refresh_rate)
  }
}

feature.on('click',e=>{ // On click, create new object and start refreshing the position
let newobject = feature
if(clone){
newobject = parcel.createFeature('vox-model')
newobject.set({scale:[feature.scale.x,feature.scale.y,feature.scale.z]})

newobject.set({url:feature._content.url})
newobject.position=feature.position
newobject.rotation=feature.rotation
}

setPosition(newobject,e)

})
