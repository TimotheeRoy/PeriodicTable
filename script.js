let data;
let isShown = false

const removeIncertitude = (string) => {
   let rep = '';
   if (string[0] !== "[") {
       for (let num of string) {
           if (num !== '(') { rep += num }
           else { break }
       }
       return rep
   }else return string.slice(1,-1) 
}

document.addEventListener('DOMContentLoaded', () => { 
   const elements = document.querySelectorAll('.element')

   for (let elem of elements) {
      elem.addEventListener('click', async function(){

         if (elem.textContent === '57-71'){
            const lantha = new Array(15)
            for (let i=0; i<lantha.length; i++){
               lantha[i] = await getInfo(57+i)
            }
            for (let item of lantha){
               showInfo(item)
               isShown = true
            }
         }
         else if (elem.textContent === '89-103'){
            const actinide = new Array(15)
            for (let i=0; i<actinide.length; i++){
               actinide[i] = await getInfo(89+i)
            }
            console.log(actinide)
            for (let item of actinide){
               showInfo(item)
               isShown = true
            }
         }
         else {
            const infoContent = await getInfo(this.textContent);
            showInfo(infoContent)
            isShown = true;
         } 
      })

      if (!isShown){
         elem.addEventListener('mouseover', async function () {
            const infoContent = await getInfo(this.textContent);
            showInfo(infoContent)
         })
   
         elem.addEventListener('mouseout', () => {
            if (!isShown) hideInfo();
            isShown = false;
         })
      }
   }

   const getInfo = async (elem) => {
      const res = await fetch('infoElements.json')
      data = await res.json()
      if (typeof elem === 'string')
         return data.find(element => elem === element.symbol)
      else
         return data.find(element => elem === element.atomicnumber)     
   }

   const showInfo = (content) => {
      console.log("showInfo , content:", content)
      const infoBox = document.querySelector('.element-info')
      const infoContent = document.querySelector('.content-info')

      infoContent.innerHTML = ''

      const formattedInfos = `
      <strong>Numéro atomique:</strong> ${content.atomicnumber}<br>
      <strong>Symbole:</strong> ${content.symbol}<br>
      <strong>Nom:</strong> ${content.name}<br>
      <strong>Configuration électronique:</strong> ${content.electronicconfiguration}<br>
      <strong>Masse molaire :</strong> ${removeIncertitude(content.atomicmass)} g/mol<br>
      `
      const elementRareInfo = `
      <table> <tr> <td>
      ${content.atomicnumber} ${content.symbol} ${content.name}
      </td> </tr> </table>`

      infoBox.style.display = 'block'
      if ((content.atomicnumber>= 57 && content.atomicnumber<=71)||(content.atomicnumber>= 89 && content.atomicnumber<=103))
         infoContent.innerHTML += elementRareInfo
      else
         infoContent.innerHTML = formattedInfos
   }

   const hideInfo = () => {
      const infoBox = document.querySelector('.element-info')
      infoBox.style.display = 'none'
   };
});