var siteNameInput = document.getElementById('siteName')
var siteUrlInput = document.getElementById('siteUrl')

var sitesContainer = []

if(localStorage.getItem('sites') !== null){
    sitesContainer = JSON.parse(localStorage.getItem('sites'))
    displaySite()
}

function submit(){
    if(validateForm(siteNameInput) && validateForm(siteUrlInput)){
        var site = {
            code: siteNameInput.value,
            url: siteUrlInput.value
        }
    
        sitesContainer.push(site)
        localStorage.setItem('sites', JSON.stringify(sitesContainer))
        displaySite()
        clearForm()
    }
    else{
        Swal.fire({
            showCloseButton: true,
            title: `<div class="traffic-light">
                <div class="circle red"></div>
                <div class="circle yellow"></div>
                <div class="circle green"></div>
            </div>Site Name or Url is not valid, Please follow the rules below:`,
            html: `<ul>
                    <li class="text-start list-unstyled"><i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 characters</li>
                    <li class="text-start list-unstyled"><i class="fa-regular fa-circle-right"></i> Site URL must be a valid one</li>
                   </ul>`
          })
    }
}

function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null
}

console.log(siteUrlInput.value)

function displaySite(){
    var index = 1
    var sites = ''
    for(var i = 0; i < sitesContainer.length; i++){
        sites += `
        <tr>
            <td>${index++}</td>
            <td>${sitesContainer[i].code}</td>
            <td onclick='visitSite(${i})' class="visit-btn"><button class="btn py-1 px-2"><a class="text-decoration-none text-white"><i class="fa-solid fa-eye text-white"></i> Visit</a></button></td>
            <td onclick='deleteSite(${i})' class="delete-btn"><button class="btn py-1 px-2"><i class="fa-solid fa-trash-can text-white"></i> Delete</button></td>
        </tr>
        `
    }
    document.getElementById('sites').innerHTML = sites
}

function visitSite(index) {
    var regex = /^https?:\/\//;
    if(regex.test(sitesContainer[index].url)){
        open(sitesContainer[index].url);
    }
    else{
        open(`https://${sitesContainer[index].url}`)
    }
}

function deleteSite(index){
    sitesContainer.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(sitesContainer))
    displaySite()
}

function validateForm(ele){
    var regex = {
        siteName: /\w{3,}/,
        siteUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }

    if(regex[ele.id].test(ele.value)){
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        return true
    }
    else{
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        return false
    }
}