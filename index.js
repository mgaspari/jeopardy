
// var topics = ["Hillary Clinton", "Ted Cruz", "Jeb Bush", "Marco Rubio", "President Obama", "Elizabeth Warren", "John Kasich", "Bernie Sanders", "Bill Clinton", "Lindsey Graham", "Ben Carson", "Carly Fiorina", "John McCain", "Rick Perry", "George Pataki", "Scott Walker", "Tim Kaine", "Rand Paul", "Donald Trump", "George W. Bush", "Megyn Kelly", "Women", "Bobby Jindal", "Martin O'Malley", "Tom Ridge", "Michael Nutter", "Barack Obama", "Mexico", "Immigrants", "Cory Booker", "Sam Liccardo", "Lincoln Chafee", "Apologies", "Muslims", "Bakari Sellers", "Illegal Immigrants", "Chris Christie", "Arianna Huffington", "Neil Young", "History", "Sexual Assults", "Military", "Marty Walsh", "Ben Cardin", "Stephanie Rawlings-Blake", "Mitt Romney", "Ivanka Trump", "Ruth Bader Ginsburg", "Girlfriends", "Joseph R. Biden Jr.", "Muammar Gaddafi", "Bill and Hillary Clinton", "Money", "Bette Midler"]
var resp;
var questions;
var catagories;
// var _ = require('underscore-contrib');
var values;
document.addEventListener('DOMContentLoaded', function(){
  fetch(`http://www.jservice.io/api/clues`).then(res => res.json()).then(res => resp = res).then(get_options).then(set_options)

  // btn = $('button')[0]
  // btn.addEventListener("hover", (e) => {
  //
  // })
})
var get_options = () =>{
  var arr = []
  resp.forEach((val) => {
    arr.push(val["category"]["title"])
  })
  catagories = _.uniq(arr)
}
var set_options = () =>{
catagories.forEach((val) => {
    var lnk = document.createElement("A")
    lnk.href = "#"
    lnk.innerHTML = val
    $('.dropdown-content')[0].append(lnk)
    lnk.addEventListener("click", (e) =>{
      e.preventDefault
      selectedTopic = e.target.innerHTML
      console.log(selectedTopic)
      get_questions()
    })
  })}

  var get_selected_id = ()  => {
    var k = _.find(resp, function(anything) {
    return selectedTopic === anything["category"]["title"]})
    return k.id
  }

  var get_questions = () => {
    fetch(`http://www.jservice.io/api/category?id=${get_selected_id()}`)
    .then(res => res.json())
    .then(get_values)
  }

  var get_values = (data) =>{
    questions = data
    console.log(data)
    var arr = []
    data['clues'].forEach((val) => {
      arr.push(val["value"])
    })
    let tempArray = _.uniq(arr)
    values = _.compact(tempArray)
    add_values_page()
  }

  var add_values_page = () =>{
    values.forEach((val)=>{
      var lItem = document.createElement("LI")
      lItem.id = "val_opt"
      lItem.innerHTML = val
      $('#list_here').append(lItem)
      lItem.addEventListener("click", (e)=>{
        e.preventDefault
        console.log(e)
        showQuestion(e.target.innerHTML)
        //e.target.innerHTML
    })
    })
  }

var showQuestion = (val) => {
  let currQuestion = _.find(questions["clues"], (something)=>{
    return something["value"] === parseInt(val)
  })
  let quesShow = currQuestion['question']
  let quesAnswer = currQuestion['answer']
  $('#put_q_here').append(`<p>${quesShow}</p>`)
}
  // var add_listen = () => {
  //   $(".val_opt").forEach((p)=>{
  //     p.addEventListener("click", (e)=>{
  //       e.preventDefault
  //       console.log(e)
  //   })
  //   })
  // }
  // need to sort values

  //listener for the buttons (potentially give the topics ids)
// Call the api with the selected topic
//take response and process it
//take it and pu it on the screen
//make twitter pic


//selectedTopic = e.target.innerHTML
