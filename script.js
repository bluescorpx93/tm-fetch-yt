document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getJSONUsers').addEventListener('click', getJSONUsers);
document.getElementById('getAPIDataRandomAPI').addEventListener('click', getAPIDataRandomAPI);
document.getElementById('getAPIDataJSONPlaceholder').addEventListener('click', getAPIDataJSONPlaceholder);

function getText(){
  fetch('sample.txt').then( (res) => { return res.text() } ).then( (data) => { document.getElementById('output').innerHTML = data } ).catch( (err) => console.log(err) )
}

function getJSONUsers(){
  fetch('users.json').then( (res) => res.json() ).then( (data) => {
    let output = '<h2> Users</h2>';
    data.forEach( (item) => {
      output += `<div>
                  <p> Name: ${item.name} </p>
                  <p> Age: ${item.age}</p>
                </div>`;
    });
    document.getElementById('output').innerHTML = output;
  })
}

function getAPIDataRandomAPI(){
  var APIURL = 'https://randomapi.com/api/e6ac05b947fd4f5eab6de20326b912ee';

  fetch(APIURL).then( (res) => res.json() ).then( (data) => {
    
    let output = '<h2> Shopping Items</h2>';
    console.log(data.results[0].shoppingItems);
    data.results[0].shoppingItems.forEach( (item) => {
      output += `<div>
                  <p> Name: ${item.name} </p>
                  <p> Age: ${item.price}</p>
                </div>`;
    });
    document.getElementById('output').innerHTML = output;
  
  }) ;
}

function getAPIDataJSONPlaceholder(){
  var APIURL = 'https://jsonplaceholder.typicode.com/posts';

  fetch(APIURL).then( (res) => res.json() ).then( (data) => {
    
    let output = '<h2> Posts</h2>';
    for (var i=0; i<3; i++){
      postStr = `"${data[i].body}"`;
      buttonRMID = `"postRMBtn${data[i].id}"`;
  
      divID = `"postDiv${data[i].id}"`;
      paraID = `"postParaBody${data[i].id}"`;
      output += `<div id=${divID}>
                  <h3> ${data[i].id}. ${data[i].title} </h3>
                  <div> <p id=${paraID}> ${data[i].body.slice(0,100)} ... </p>
                    <button id=${buttonRMID} onclick='showFullPost(${paraID}, ${data[i].id}, ${buttonRMID})'>Read More</button>
                  </div>
                </div>`;
    }
    // data.forEach( (item) => {
    //   output += `<div>
    //               <h3> ${item.title} </h3>
    //               <div id=${item.id}> <p> ${item.body.slice(0,200)} ... </p>
    //                 <button class='readmore' onclick="showFullPost(${item.id},postStr)"> Read More</button> 
    //                 <button class='less' onclick='showLess' style='display: none'> Less </button>
    //               </div>
    //             </div>`;
    // });
    document.getElementById('output').innerHTML = output;
  
  }) ;
}

function showFullPost(pElemID, postID, btnID){
  var APIURL = `https://jsonplaceholder.typicode.com/posts/${postID}`;
  var thePostObj = {};
  fetch(APIURL).then(res => res.json()).then( data => {
    thePostObj = data;
    document.getElementById(pElemID).innerHTML = thePostObj.body;
      
    if (document.getElementById(`${btnID}`).innerText == 'Read More'){
      document.getElementById(`${btnID}`).innerText = 'Read Less';
      document.getElementById(`${btnID}`).removeAttribute("onclick");
      document.getElementById(`${btnID}`).addEventListener('click', function(e){
        e.preventDefault();
        if (document.getElementById(`${btnID}`).innerText == 'Read Less'){
          document.getElementById(`${pElemID}`).innerHTML = thePostObj.body.slice(0,100) + " ...";
          document.getElementById(`${btnID}`).innerText = 'Read More';
          resetFunctionName = `showFullPost("${pElemID}", ${postID}, "${btnID}")`;
          document.getElementById(`${btnID}`).setAttribute("onclick", resetFunctionName);
        }
      });
    }
});
  
  
}