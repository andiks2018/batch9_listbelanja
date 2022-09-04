console.log('Hello!, konek ya');

//di modal yang tadinya display kita kasih flex jadi nya kita kasih none

//kita akan tangkap beberapa elemen html
let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById("root");
let subtitle = document.getElementById("subtitle");

//tambahkan date ke subtitle
subtitle.innerHTML= new Date().toLocaleDateString();


//data list belanja, bentuk array
let data_list_belanja=[];

//menambahkan evenlistener ke floating button
floating_button.addEventListener('click', () => {
  //ini untuk mencoba fungsinya setelah berjalan kita tinggalkan
  //console.info("kamu menekan tombol")

  //atur style pada modal menjadi flex dari kondisi none, dan ini berhasil cuman gak bisa digunakan karena gak bisa baliknya lagi, kita jadikan command juga, untuk itu kita kasih if
  //modal.style.display = "flex"

  //munculkan modal
  if (modal.style.display == 'none') {
    showModal();
    return;
  }
  //sembunyikan kembali
  hideModal();
});

//menambahkan event listener ke modal bg
modal_bg.addEventListener('click', () => {
  //sembunyikan kembali
  modal.style.display = 'none';
  floating_button.style.backgroundColor = 'blueviolet';
  floating_button.style.transform = 'rotate(0deg)';
});

//menambhakn eventlistener submit ke addlist form
addlist_form.addEventListener('submit', (event) => {
  //stop formdari reload page
  event.preventDefault();

  //tangkap value dari masing masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // console.info({
  //   barang,
  //   harga,
  // });

  //push data ke data list belanja
  data_list_belanja.push ({
    nama_barang : barang,
    harga_barang : harga,
    tanggal : new Date().toLocaleDateString()
  })

  console.info(data_list_belanja);
  //clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';
  hideModal();
  renderToHtml();
});

//ada kekurangan dari function diatas pertama isian masih ada diinput, dan yan gkedua yaitu ketika submit harusnya harunya ilang. kita akan buat function baru

//show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'grey';
  floating_button.style.transform = 'rotate(45deg)';
}

//hide modal
function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = 'blueviolet';
  floating_button.style.transform = 'rotate(0deg)';
}

//render function
function renderToHtml(){
  //clear element div = "";

  //perulangan
  data_list_belanja.forEach((e, i)=>{
    root.innerHTML+=`
    <div class="card">
      <small>${e.tanggal}</small>
      <div>
        ${e.nama_barang} <span> Rp. ${e.harga_barang} </span>
      </div>
      <button onclick="handleDelete(${i})">Selesai</button>
    </div>
    `
  })
}

//function untuk delete item pada array 
function handleDelete(index){
  data_list_belanja.splice(index, 1);
  renderToHtml();
}
