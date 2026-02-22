// LOGIN + REGISTER AUTO
if(document.getElementById("loginForm")){

document.getElementById("loginForm").addEventListener("submit",function(e){
e.preventDefault();

let nama=document.getElementById("nama").value;
let password=document.getElementById("password").value;

let users=JSON.parse(localStorage.getItem("users"))||[];

let user=users.find(u=>u.nama===nama);

if(!user){
// register baru
user={
nama:nama,
password:password,
foto:null,
bg:null,
dark:false,
font:"Segoe UI"
};
users.push(user);
}else{
// cek password
if(user.password!==password){
alert("Password salah!");
return;
}
}

localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("activeUser",nama);
window.location.href="dashboard.html";

});
}

// DASHBOARD LOAD
if(document.getElementById("namaTampil")){

let users=JSON.parse(localStorage.getItem("users"))||[];
let active=localStorage.getItem("activeUser");

let user=users.find(u=>u.nama===active);
if(!user) window.location.href="login.html";

document.getElementById("namaTampil").innerText=user.nama;
document.getElementById("welcomeText").innerText="Halo "+user.nama;

// FOTO
if(user.foto) document.getElementById("fotoPreview").src=user.foto;

document.getElementById("uploadFoto").addEventListener("change",function(){
let r=new FileReader();
r.onload=function(){
user.foto=r.result;
saveUsers(users);
document.getElementById("fotoPreview").src=r.result;
showNotif("Foto disimpan");
};
r.readAsDataURL(this.files[0]);
});

// BACKGROUND UPLOAD
if(user.bg){
document.body.style.backgroundImage=`url(${user.bg})`;
}

document.getElementById("bgUpload").addEventListener("change",function(){
let r=new FileReader();
r.onload=function(){
user.bg=r.result;
saveUsers(users);
document.body.style.backgroundImage=`url(${r.result})`;
showNotif("Background disimpan");
};
r.readAsDataURL(this.files[0]);
});

// DARK MODE
if(user.dark){
document.body.classList.add("dark");
document.getElementById("darkToggle").checked=true;
}

document.getElementById("darkToggle").addEventListener("change",function(){
user.dark=this.checked;
saveUsers(users);
document.body.classList.toggle("dark");
});

// FONT
document.body.style.fontFamily=user.font;

document.getElementById("fontSelect").value=user.font;

document.getElementById("fontSelect").addEventListener("change",function(){
user.font=this.value;
document.body.style.fontFamily=this.value;
saveUsers(users);
});

// CHART
new Chart(document.getElementById("chart"),{
type:"line",
data:{
labels:["Jan","Feb","Mar","Apr"],
datasets:[{
label:"Data",
data:[10,20,15,25]
}]
}
});

}

// NAVIGATION
function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

// LOGOUT
function logout(){
localStorage.removeItem("activeUser");
window.location.href="login.html";
}

// SAVE
function saveUsers(u){
localStorage.setItem("users",JSON.stringify(u));
}

// NOTIF
function showNotif(text){
let n=document.getElementById("notif");
n.innerText=text;
n.classList.add("show");
setTimeout(()=>n.classList.remove("show"),2000);
}

// FOTO PROFILE
if(user.foto){
document.getElementById("fotoPreview").src=user.foto;
}else{
document.getElementById("fotoPreview").src="https://via.placeholder.com/150";
}

document.getElementById("uploadFoto").addEventListener("change",function(){
let file=this.files[0];

if(file){
let reader=new FileReader();

reader.onload=function(){
user.foto=reader.result;
saveUsers(users);
document.getElementById("fotoPreview").src=reader.result;
showNotif("Foto profil disimpan");
};

reader.readAsDataURL(file);
}
});