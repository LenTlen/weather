var Weather = new Vue({
  el: '#app',
  data: {
    search: '',
    tbDatas: [],
    variants: [],
    matches: []
  },

// Dropdown list of matches of city names
watch: {
  search: function (value) {

    value = value.toLowerCase();
    this.matches = [];

    for (var i = 0; i < this.variants.length; i++) {
      if (this.matches.length >= 10) {
        break;
      }
      let name = this.variants[i].name.toLowerCase();
      if (name.includes(value)) {
        this.matches.push(this.variants[i]);
      }
    }
  }
},

// Data of variants(city, id, country)
created(){
  axios
  .get('https://lentlen.github.io/citylist/new_city.json')
  .then(response =>{
    this.variants = response.data;
  })
  .catch(error => {
  alert('Server connection error!'); //if first api has error
})
}, 


methods: {
 fAddNewItem: function(item) {
// trying to make a button without reboot. Fail -_-
},
  // Add new row in table with the selected city
  fAddNewRow: function (item) { 
    this.search = item.name;
    let url = "http://api.openweathermap.org/data/2.5/weather?id=" + item.id + "&appid=b09b8101d2f64e999689bf3668ecbe97";
    axios
    .get(url)
    .then(response => {
      this.matches = [];
      this.tbDatas.push(response.data);
      this.search = []; // clear search
    })
    .catch(error => {
  alert('server connection error!'); //if second api has error
});
  },

  // Delete row with index number
  fDeleteRow: function (index) { 
    this.tbDatas.splice(index, 1);
  }
}

});
