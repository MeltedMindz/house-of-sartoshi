// scale textbox

let x = parcel.getFeatureById('[enter_ID]')
feature.on('click',e=>{
   x.scale.set(1.13,0.5,1)
  setTimeout(()=>{ 
  x.scale.set(0.01,0.01,0.01)
},5000)
})
