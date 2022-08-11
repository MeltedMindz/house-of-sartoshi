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
