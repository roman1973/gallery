(function(){

   let btadd = document.getElementById("add"),
       resultBlock = document.querySelector('#result'),
       countBlock = document.querySelector('#count'),
       selectBlock = document.getElementById("line-selector"),
       topperBlock = document.querySelector("#seltop"),
       computedStyle,
       addArray = [],
       removeArray = [] ,
       sumArr = [];
   localStorage.setItem('select', '0');
   selectBlock.classList.add("hide") ;

        //преобразование даты
   let newDate = function(date){
       var tmpDate = new Date(date);
       return tmpDate.getFullYear() + "/" +
           tmpDate.getMonth() + "/" +
           tmpDate.getDate() + " " +
           tmpDate.getHours() + ":" +
           tmpDate.getMinutes();
   };

   //преобразование url
   let  newUrl = function(url){
       return url.includes('http://') ? url : 'http://'+url;

   };
   //преобразование названия
   let  newName = function(name){
       return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

   };
   //преобразование описания
   let  newDescription = function(description){
       return (description.length > 15 ) ? description.slice(0,15) + '...' : description;

   };
//Функция удаления елемента галлереи
   let clickRemove = function(event) {
       let delId = event.target.name;//button
       let btdel = document.getElementById("del");
       if(event.target.id == btdel.id){
           removeArray.push(addArray.filter(item => { return item.id === parseInt(delId)})[0]);
           document.getElementById(delId).remove();//удаления елемента галлереи
    //  event.stopPropagation();
           if(addArray.length === data.length ){
               btadd.style['background-color'] = computedStyle ;
           }
           addArray = addArray.filter(item => { return item.id !== parseInt(delId)});//удаления елемента из масива добавленых
           countBlock.innerHTML = addArray.length;
      //упорядочнение номера возле имени
          if(addArray.length == 1){
              let numberChange = document.getElementsByClassName('number');
              for(let i=0; i<numberChange.length; i++){
                  numberChange[i].innerHTML = numberChange[i].innerHTML.replace( /\d{1,}/,i + 1).toString();
              }
          }
        }
    }
//Функция сортировки елементов галлереи

let sortGallery = function() {
    let sortArray = [];
    switch (localStorage.getItem('select')) {
        case "0":
           sortArray = addArray.sort((a,b)=>{
               if (a.name > b.name) return 1;
               if (a.name < b.name) return -1;
           })

           break;
       case "1":
           sortArray = addArray.sort((a,b)=>{
               if (a.name < b.name) return 1;
               if (a.name > b.name) return -1;
           })
           break;
       case "2":
           sortArray = addArray.sort((a,b)=>{
               if (a.date < b.date) return 1;
               if (a.date > b.date) return -1;
           })

           break;
        case "3":
            sortArray = addArray.sort((a,b)=>{
                if (a.date > b.date) return 1;
                if (a.date < b.date) return -1;
            })

            break;
   }
   return sortArray;
}

      //Функция отображения селект бокса
let selectDisplay = function(event) {
    let btdel = document.getElementById("del");
    if((event.target.id == selectBlock.id)||(event.target.id == btdel.id)||(event.target.id == btadd.id)){
        let resultHTML = '';
        if(addArray.length > 1){
            if(!selectBlock.classList.contains("show"))  selectBlock.classList.add("show") ;
            if(selectBlock.classList.contains("hide"))  selectBlock.classList.remove("hide") ;

            if(event.target.id == selectBlock.id){
                localStorage['select'] = selectBlock.value;
            }
            sortGallery().forEach((elem,i,sortArr )=>{
                    // language=HTML
                resultHTML += `<div class="col-md-3 col-sm-4 col-xs-6 text-center" id="${elem.id}">
                                   <div class="thumbnail">
                                       <img src="${newUrl(elem.url)}" alt="${newName(elem.name)}">
                                       <div class="caption">
                                           <h3  class="number" >${i + 1}: ${newName(elem.name)}</h3>
                                           <p>${newDescription(elem. description)} </p>
                                           <p>${newDate(elem.date)}</p>
                                       </div>
                                       <button id = "del" name="${elem.id}" class="btn btn-danger">Удалить</button>
                                  </div>
                                </div>`;
                })
                resultBlock.innerHTML = resultHTML;

               }else{
                   if(!selectBlock.classList.contains("hide"))  selectBlock.classList.add("hide") ;
                   if(selectBlock.classList.contains("show"))  selectBlock.classList.remove("show") ;
               }
      }
  }
//Функция добавления елемента галлереи
let clickAdd = function(event) {
    if(event.target.id == btadd.id){
        let filtArr = [];
        if(addArray.length != data.length ){
            if((addArray.length != data.length) &&( removeArray.length === 0)){
                addArray.push(data[addArray.length]);
            }else{
                sumArr = [...addArray,...removeArray];

                if(sumArr.length != data.length){
                    filtArr = data.filter(item =>{ return sumArr.every(elem => {return item.id != elem.id})});

                    addArray.push(filtArr[0]);
                }else{
                     addArray.push(removeArray[0]);
                     removeArray.splice(0,1);
                }
          }
        countBlock.innerHTML = addArray.length;
        if(addArray.length === 1){
            let resultHTML = `<div class="col-md-3 col-sm-4 col-xs-6 text-center" id="${addArray[addArray.length - 1].id}">
  			                   <div class="thumbnail">
  			                    <img src="${newUrl(addArray[addArray.length - 1].url)}" alt="${newName(addArray[addArray.length - 1].name)}">
  			                    <div class="caption">
  			                       <h3  class="number" >${addArray.length}: ${newName(addArray[addArray.length - 1].name)}</h3>
  			                       <p>${newDescription(addArray[addArray.length - 1]. description)} </p>
  			                       <p>${newDate(addArray[addArray.length - 1].date)}</p>
  			                     </div>
  			                    <button id = "del" name="${addArray[addArray.length - 1].id}" class="btn btn-danger">Удалить</button>
  			                 </div>
  		                 </div>`;
           resultBlock.innerHTML = resultHTML;
           resultBlock.addEventListener('click', clickRemove);
        }



        }else{
             computedStyle = btadd.style['background-color'];

             btadd.style['background-color'] = 'Gray';
             alert("Нет доступных елементов для добавления в галлерею!!!");
        }
      }
    }
  btadd.addEventListener('click', clickAdd);
  topperBlock.addEventListener('click', selectDisplay);

})()
