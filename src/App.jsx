import { useState,useCallback,useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  //initialising methods
   const [length,setlength]=useState(6)
   const [numallowed,setnumallowed]=useState(false) 
   const [charallowed, setcharallowed]= useState(false)
   const [password,setpassword]=useState("")
  

  //  method to generate pasword
   const passgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charallowed) str+="~!@#$%^&*()_+=-_:;></?|"
    if (numallowed) str+="0123456789"
    for (let index = 0; index < length; index++) {
      let rand=Math.floor(Math.random()*str.length)
      pass+= str.charAt(rand);  
    }
    if(charallowed && numallowed){
      if(!(charcontain(pass) && numcontain(pass)))return passgen();
    }
    else if(charallowed){
      if(!charcontain(pass)) return passgen();
    }
    else if(numallowed){
      if(!numcontain(pass))return passgen();
    }


    setpassword(pass)
   },[charallowed,numallowed,length])

   useEffect(()=>{
    passgen()
   },[numallowed,charallowed,length])


// check if contain characters
function charcontain(pass){
  for (let index = 0; index < pass.length; index++) {
    const asci = pass.charCodeAt(index);
    if((asci>=33 && asci<=47) || (asci>=58 && asci<=64) || (asci>=123 && asci<=126) ) return true
  }
  return false
}


// check if contain numbers
function numcontain(pass){
  for (let index = 0; index < pass.length; index++) {
    const asci = pass.charCodeAt(index);
    if((asci>=48 && asci<=57) ) return true
  }
  return false
}


//useRef
const passref=useRef(null)

// function to copy the password
   function copypass(){
      window.navigator.clipboard.writeText(password)
      passref.current?.select();
      let btn=document.getElementById("btn")
      btn.innerHTML="copied";
      btn.style.color="yellow";
      setTimeout(() => {
        btn.innerHTML="Copy";
        btn.style.color="white"
        passref.current?.setSelectionRange(0,0);
      }, 3000);  
   }



  return (
    <>
    {/* viewscreen */}
    <div className='w-full h-screen bg-pink-300 flex flex-row justify-center'>

      {/* workarea */}
      <div className='h-[150px] w-2/3 bg-pink-500 rounded-xl flex flex-col m-20'>

          <div className='flex flex-row justify-center rounded my-4 h-9 m-auto w-2/3'>
          
          {/* password-block */}
            <input type="text" className='w-[95vw] rounded-l-lg outline-none text-orange-700 text-xl' readOnly value={password}/>
            {/* copy-button */}
            <button id='btn' className='bg-purple-500 text-white text-xl rounded-r-lg p-2 flex items-center justify-center' onClick={(e)=>{
               copypass()
            }}>Copy</button>

          </div>

          <div className='flex flex-row gap-8 m-auto text-2xl'>

            <div className="flex items-center gap-x-1">
               {/* slider */}
               <input type="range" min={6} max={100}   className="range range-2xl w-[170px] h-29 " onChange={(e)=>{setlength(e.target.value)}} defaultValue={length}/>
               {/* set numeric length at slider */}
              <label className='text-white' >Length:{length} </label> 

            </div>

            <div className="flex items-center gap-x-1">

                {/* character-allowence */}
              <input type="checkbox" id="" name="" defaultChecked={charallowed} className='size-6' onChange={()=>{
                setcharallowed((prev)=>!prev)
              }} />
              <label className='text-white' >Character</label> 

            </div>
            <div className="flex items-center gap-x-1">

               {/* number-allowence  */}
              <input type="checkbox" id="" name="" defaultChecked={numallowed} className='size-6' onChange={()=>{
                setnumallowed((prev)=>!prev)
              }}/>
              <label className='text-white'  >Number</label> 

            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
